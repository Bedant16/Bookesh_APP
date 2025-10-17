-- Create enum types
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE seat_type AS ENUM ('standard', 'premium', 'vip');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'completed', 'cancelled');

-- Create movies table
CREATE TABLE movies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL,
  genre TEXT NOT NULL,
  rating DECIMAL(2,1),
  image_url TEXT,
  release_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Movies are viewable by everyone"
ON movies FOR SELECT
USING (true);

-- Create events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL,
  venue TEXT NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by everyone"
ON events FOR SELECT
USING (true);

-- Create restaurants table
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  cuisine TEXT NOT NULL,
  rating DECIMAL(2,1),
  delivery_time TEXT,
  is_cinema_vendor BOOLEAN DEFAULT false,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Restaurants are viewable by everyone"
ON restaurants FOR SELECT
USING (true);

-- Create food_items table
CREATE TABLE food_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE food_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Food items are viewable by everyone"
ON food_items FOR SELECT
USING (true);

-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Create function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signups
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create movie_bookings table
CREATE TABLE movie_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  movie_id UUID REFERENCES movies(id) ON DELETE CASCADE NOT NULL,
  seat_numbers TEXT[] NOT NULL,
  seat_type seat_type NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  booking_status booking_status DEFAULT 'pending',
  booking_date TIMESTAMPTZ NOT NULL,
  show_time TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE movie_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own movie bookings"
ON movie_bookings FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own movie bookings"
ON movie_bookings FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create event_bookings table
CREATE TABLE event_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  total_price DECIMAL(10,2) NOT NULL,
  booking_status booking_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE event_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own event bookings"
ON event_bookings FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own event bookings"
ON event_bookings FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create food_orders table
CREATE TABLE food_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE NOT NULL,
  delivery_address TEXT,
  order_status order_status DEFAULT 'pending',
  total_price DECIMAL(10,2) NOT NULL,
  delivery_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE food_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own food orders"
ON food_orders FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own food orders"
ON food_orders FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create food_order_items table
CREATE TABLE food_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES food_orders(id) ON DELETE CASCADE NOT NULL,
  food_item_id UUID REFERENCES food_items(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE food_order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own order items"
ON food_order_items FOR SELECT
USING (EXISTS (
  SELECT 1 FROM food_orders 
  WHERE food_orders.id = order_id 
  AND food_orders.user_id = auth.uid()
));

-- Create payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  razorpay_order_id TEXT NOT NULL,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'created',
  booking_type TEXT NOT NULL,
  booking_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own payments"
ON payments FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own payments"
ON payments FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();