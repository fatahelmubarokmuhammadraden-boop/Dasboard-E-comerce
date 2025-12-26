import streamlit as st
import pandas as pd
import plotly.express as px
import matplotlib.pyplot as plt

# Load data
@st.cache_data
def load_data():
    orders = pd.read_csv('E-commerce-dataset/E-Commerce Public Dataset/orders_dataset.csv')
    customers = pd.read_csv('E-commerce-dataset/E-Commerce Public Dataset/customers_dataset.csv')
    products = pd.read_csv('E-commerce-dataset/E-Commerce Public Dataset/products_dataset.csv')
    order_items = pd.read_csv('E-commerce-dataset/E-Commerce Public Dataset/order_items_dataset.csv')
    return orders, customers, products, order_items

orders, customers, products, order_items = load_data()

# Merge data
merged = orders.merge(customers, on='customer_id', how='left')
merged = merged.merge(order_items, on='order_id', how='left')
merged = merged.merge(products, on='product_id', how='left')

# Dashboard
st.title('Dashboard Visualisasi Data E-commerce')

# Tren Penjualan
st.header('Tren Penjualan')
orders['order_purchase_timestamp'] = pd.to_datetime(orders['order_purchase_timestamp'])
sales_trend = orders.groupby(orders['order_purchase_timestamp'].dt.to_period('M')).size()
fig = px.line(sales_trend, title='Tren Penjualan Bulanan')
st.plotly_chart(fig)

# Kategori Produk Teratas
st.header('Kategori Produk Teratas')
top_categories = merged['product_category_name'].value_counts().head(10)
fig = px.bar(top_categories, title='Top 10 Kategori Produk')
st.plotly_chart(fig)

# Distribusi Status Pesanan
st.header('Distribusi Status Pesanan')
status_dist = orders['order_status'].value_counts()
fig = px.pie(status_dist, title='Distribusi Status Pesanan')
st.plotly_chart(fig)

# Lokasi Pelanggan
st.header('Lokasi Pelanggan')
customer_locations = customers['customer_state'].value_counts()
fig = px.bar(customer_locations, title='Jumlah Pelanggan per Negara Bagian')
st.plotly_chart(fig)
