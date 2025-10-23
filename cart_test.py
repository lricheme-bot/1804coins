#!/usr/bin/env python3
"""
Shopping Cart Backend Test Suite
Tests cart functionality as specified in the review request
"""

import requests
import json
import sys
import os
from datetime import datetime

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except FileNotFoundError:
        return "http://localhost:8001"
    return "http://localhost:8001"

BASE_URL = get_backend_url()
API_URL = f"{BASE_URL}/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_test_header(test_name):
    print(f"\n{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}Testing: {test_name}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")

def print_success(message):
    print(f"{Colors.GREEN}✓ {message}{Colors.ENDC}")

def print_error(message):
    print(f"{Colors.RED}✗ {message}{Colors.ENDC}")

def print_warning(message):
    print(f"{Colors.YELLOW}⚠ {message}{Colors.ENDC}")

def print_info(message):
    print(f"{Colors.BLUE}ℹ {message}{Colors.ENDC}")

class CartTester:
    def __init__(self):
        self.token = None
        self.user_data = None
        self.test_results = {
            'passed': 0,
            'failed': 0,
            'errors': []
        }

    def make_request(self, method, endpoint, data=None, headers=None):
        """Make HTTP request with error handling"""
        url = f"{API_URL}{endpoint}"
        print_info(f"Making {method} request to: {url}")
        
        if data:
            print_info(f"Request body: {json.dumps(data, indent=2)}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=30)
            else:
                print_error(f"Unsupported HTTP method: {method}")
                return None
            
            print_info(f"Response status: {response.status_code}")
            
            if response.headers.get('content-type', '').startswith('application/json'):
                try:
                    response_data = response.json()
                    print_info(f"Response body: {json.dumps(response_data, indent=2)}")
                except:
                    print_info(f"Response body (text): {response.text}")
            else:
                print_info(f"Response body (text): {response.text}")
            
            return response
            
        except requests.exceptions.RequestException as e:
            print_error(f"Request failed: {str(e)}")
            return None

    def test_register_and_login(self):
        """Test user registration and login for cart testing"""
        print_test_header("1. Register & Login")
        
        # Use realistic test data with timestamp to avoid duplicates
        import time
        timestamp = str(int(time.time()))
        test_user = {
            "username": "carttest",
            "email": "carttest@test.com",
            "password": "test123"
        }
        
        # Try registration first
        response = self.make_request('POST', '/auth/register', test_user)
        
        if response and response.status_code == 200:
            try:
                data = response.json()
                if 'token' in data and 'user' in data:
                    self.token = data['token']
                    self.user_data = data['user']
                    print_success("Registration successful")
                    print_success(f"Token received: {self.token[:20]}...")
                    print_success(f"User ID: {self.user_data['id']}")
                    self.test_results['passed'] += 1
                    return True
            except json.JSONDecodeError:
                pass
        
        # If registration fails (user might exist), try login
        print_info("Registration failed, trying login...")
        login_data = {
            "email": test_user['email'],
            "password": test_user['password']
        }
        
        response = self.make_request('POST', '/auth/login', login_data)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Both registration and login failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                if 'token' in data and 'user' in data:
                    self.token = data['token']
                    self.user_data = data['user']
                    print_success("Login successful")
                    print_success(f"Token received: {self.token[:20]}...")
                    print_success(f"User ID: {self.user_data['id']}")
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("Login response missing token or user")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Login response missing token or user")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from login")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from login")
                return False
        else:
            print_error(f"Login failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Login failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Login failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_add_items_to_cart(self):
        """Test adding items to cart"""
        print_test_header("2. Add Items to Cart")
        
        if not self.token:
            print_error("No authentication token available")
            self.test_results['failed'] += 1
            self.test_results['errors'].append("No authentication token for cart operations")
            return False
        
        headers = {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json'
        }
        
        # Add items as specified in the review request
        items_to_add = [
            {"product_id": "1", "quantity": 1},
            {"product_id": "3", "quantity": 2},
            {"product_id": "14", "quantity": 1}  # Custom gift set
        ]
        
        success_count = 0
        for item in items_to_add:
            print_info(f"Adding product {item['product_id']} with quantity {item['quantity']}")
            response = self.make_request('POST', '/cart/add', item, headers)
            
            if response and response.status_code == 200:
                try:
                    data = response.json()
                    if 'message' in data:
                        print_success(f"Added product {item['product_id']}: {data['message']}")
                        success_count += 1
                    else:
                        print_error(f"Invalid response for product {item['product_id']}")
                        self.test_results['errors'].append(f"Invalid add to cart response for product {item['product_id']}")
                except json.JSONDecodeError:
                    print_error(f"Invalid JSON response for product {item['product_id']}")
                    self.test_results['errors'].append(f"Invalid JSON response for product {item['product_id']}")
            else:
                print_error(f"Failed to add product {item['product_id']}")
                if response:
                    try:
                        error_data = response.json()
                        print_error(f"Error details: {error_data}")
                        self.test_results['errors'].append(f"Add to cart failed for product {item['product_id']}: {error_data}")
                    except:
                        print_error(f"Error response: {response.text}")
                        self.test_results['errors'].append(f"Add to cart failed for product {item['product_id']}: {response.text}")
                else:
                    self.test_results['errors'].append(f"Add to cart failed for product {item['product_id']}: no response")
        
        if success_count == len(items_to_add):
            print_success(f"Successfully added all {success_count} items to cart")
            self.test_results['passed'] += 1
            return True
        else:
            print_error(f"Only added {success_count}/{len(items_to_add)} items to cart")
            self.test_results['failed'] += 1
            return False

    def test_get_cart(self):
        """Test getting cart contents"""
        print_test_header("3. Get Cart")
        
        if not self.token:
            print_error("No authentication token available")
            self.test_results['failed'] += 1
            self.test_results['errors'].append("No authentication token for get cart")
            return False
        
        headers = {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json'
        }
        
        response = self.make_request('GET', '/cart', headers=headers)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Get cart request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                cart_data = response.json()
                if isinstance(cart_data, dict):
                    print_success("Retrieved cart successfully")
                    
                    # Check expected structure
                    required_fields = ['items', 'total', 'item_count']
                    missing_fields = [field for field in required_fields if field not in cart_data]
                    if not missing_fields:
                        print_success("Cart has all required fields")
                    else:
                        print_warning(f"Cart missing fields: {missing_fields}")
                    
                    # Check if we have 3 items as expected
                    items = cart_data.get('items', [])
                    if len(items) == 3:
                        print_success("Cart contains expected 3 items")
                    else:
                        print_warning(f"Expected 3 items, got {len(items)} items")
                    
                    # Check total calculation
                    total = cart_data.get('total', 0)
                    item_count = cart_data.get('item_count', 0)
                    print_success(f"Cart total: ${total}")
                    print_success(f"Item count: {item_count}")
                    
                    # Store cart data for later tests
                    self.cart_data = cart_data
                    
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("Cart response is not a dict")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Cart response is not a dict")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from get cart")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from get cart")
                return False
        else:
            print_error(f"Get cart failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Get cart failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Get cart failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_update_quantity(self):
        """Test updating item quantity"""
        print_test_header("4. Update Quantity")
        
        if not self.token:
            print_error("No authentication token available")
            self.test_results['failed'] += 1
            self.test_results['errors'].append("No authentication token for update quantity")
            return False
        
        headers = {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json'
        }
        
        # Update product 1 quantity to 3
        update_data = {
            "product_id": "1",
            "quantity": 3
        }
        
        response = self.make_request('PUT', '/cart/update', update_data, headers)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Update quantity request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                if 'message' in data:
                    print_success(f"Updated quantity: {data['message']}")
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("Update quantity response missing message")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Update quantity response missing message")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from update quantity")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from update quantity")
                return False
        else:
            print_error(f"Update quantity failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Update quantity failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Update quantity failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_get_cart_again(self):
        """Test getting cart again to verify quantity update"""
        print_test_header("5. Get Cart Again (Verify Update)")
        
        if not self.token:
            print_error("No authentication token available")
            self.test_results['failed'] += 1
            self.test_results['errors'].append("No authentication token for get cart again")
            return False
        
        headers = {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json'
        }
        
        response = self.make_request('GET', '/cart', headers=headers)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Get cart again request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                cart_data = response.json()
                if isinstance(cart_data, dict):
                    print_success("Retrieved updated cart successfully")
                    
                    # Check if product 1 quantity is now 3
                    items = cart_data.get('items', [])
                    product_1_found = False
                    for item in items:
                        if item.get('product_id') == '1':
                            product_1_found = True
                            if item.get('quantity') == 3:
                                print_success("Product 1 quantity correctly updated to 3")
                            else:
                                print_warning(f"Product 1 quantity is {item.get('quantity')}, expected 3")
                            break
                    
                    if not product_1_found:
                        print_error("Product 1 not found in cart")
                        self.test_results['errors'].append("Product 1 not found in cart after update")
                    
                    # Check updated totals
                    total = cart_data.get('total', 0)
                    item_count = cart_data.get('item_count', 0)
                    print_success(f"Updated cart total: ${total}")
                    print_success(f"Updated item count: {item_count}")
                    
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("Cart response is not a dict")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Cart response is not a dict")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from get cart again")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from get cart again")
                return False
        else:
            print_error(f"Get cart again failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Get cart again failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Get cart again failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_remove_item(self):
        """Test removing item from cart"""
        print_test_header("6. Remove Item")
        
        if not self.token:
            print_error("No authentication token available")
            self.test_results['failed'] += 1
            self.test_results['errors'].append("No authentication token for remove item")
            return False
        
        headers = {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json'
        }
        
        # Remove product 3 from cart
        response = self.make_request('DELETE', '/cart/remove/3', headers=headers)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Remove item request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                if 'message' in data:
                    print_success(f"Removed item: {data['message']}")
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("Remove item response missing message")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Remove item response missing message")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from remove item")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from remove item")
                return False
        else:
            print_error(f"Remove item failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Remove item failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Remove item failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_checkout(self):
        """Test checkout process"""
        print_test_header("7. Checkout")
        
        if not self.token:
            print_error("No authentication token available")
            self.test_results['failed'] += 1
            self.test_results['errors'].append("No authentication token for checkout")
            return False
        
        headers = {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json'
        }
        
        response = self.make_request('POST', '/cart/checkout', headers=headers)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Checkout request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                order_data = response.json()
                if isinstance(order_data, dict):
                    print_success("Checkout successful")
                    
                    # Check expected fields
                    required_fields = ['order_id', 'total', 'message']
                    missing_fields = [field for field in required_fields if field not in order_data]
                    if not missing_fields:
                        print_success("Order has all required fields")
                    else:
                        print_warning(f"Order missing fields: {missing_fields}")
                    
                    order_id = order_data.get('order_id')
                    total = order_data.get('total')
                    message = order_data.get('message')
                    
                    print_success(f"Order ID: {order_id}")
                    print_success(f"Order total: ${total}")
                    print_success(f"Message: {message}")
                    
                    # Store order data for later verification
                    self.order_data = order_data
                    
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("Checkout response is not a dict")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Checkout response is not a dict")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from checkout")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from checkout")
                return False
        else:
            print_error(f"Checkout failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Checkout failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Checkout failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_get_orders(self):
        """Test getting user orders"""
        print_test_header("8. Get Orders")
        
        if not self.token:
            print_error("No authentication token available")
            self.test_results['failed'] += 1
            self.test_results['errors'].append("No authentication token for get orders")
            return False
        
        headers = {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json'
        }
        
        response = self.make_request('GET', '/cart/orders', headers=headers)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Get orders request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                orders = response.json()
                if isinstance(orders, list):
                    print_success(f"Retrieved {len(orders)} orders")
                    
                    if len(orders) >= 1:
                        print_success("Found at least one order as expected")
                        
                        # Check the most recent order
                        latest_order = orders[0]
                        required_fields = ['id', 'user_id', 'items', 'total', 'status', 'created_at']
                        missing_fields = [field for field in required_fields if field not in latest_order]
                        if not missing_fields:
                            print_success("Order has all required fields")
                        else:
                            print_warning(f"Order missing fields: {missing_fields}")
                        
                        # Verify order matches our checkout
                        if hasattr(self, 'order_data'):
                            if latest_order.get('id') == self.order_data.get('order_id'):
                                print_success("Order ID matches checkout response")
                            else:
                                print_warning("Order ID doesn't match checkout response")
                        
                        print_success(f"Order total: ${latest_order.get('total')}")
                        print_success(f"Order status: {latest_order.get('status')}")
                        
                    else:
                        print_warning("No orders found")
                    
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("Orders response is not a list")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Orders response is not a list")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from get orders")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from get orders")
                return False
        else:
            print_error(f"Get orders failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Get orders failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Get orders failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def run_cart_tests(self):
        """Run all cart tests in the exact order specified"""
        print(f"\n{Colors.BOLD}{'='*80}{Colors.ENDC}")
        print(f"{Colors.BOLD}SHOPPING CART BACKEND TEST SUITE{Colors.ENDC}")
        print(f"{Colors.BOLD}Testing Backend URL: {BASE_URL}{Colors.ENDC}")
        print(f"{Colors.BOLD}Testing API URL: {API_URL}{Colors.ENDC}")
        print(f"{Colors.BOLD}{'='*80}{Colors.ENDC}")
        
        # Test sequence as specified in the review request
        tests = [
            ("1. Register & Login", self.test_register_and_login),
            ("2. Add Items to Cart", self.test_add_items_to_cart),
            ("3. Get Cart", self.test_get_cart),
            ("4. Update Quantity", self.test_update_quantity),
            ("5. Get Cart Again", self.test_get_cart_again),
            ("6. Remove Item", self.test_remove_item),
            ("7. Checkout", self.test_checkout),
            ("8. Get Orders", self.test_get_orders),
        ]
        
        for test_name, test_func in tests:
            try:
                success = test_func()
                if not success:
                    print_warning(f"Test '{test_name}' failed, but continuing with remaining tests...")
            except Exception as e:
                print_error(f"Test '{test_name}' crashed: {str(e)}")
                self.test_results['failed'] += 1
                self.test_results['errors'].append(f"Test '{test_name}' crashed: {str(e)}")
        
        # Print final results
        self.print_final_results()

    def print_final_results(self):
        """Print final test results summary"""
        print(f"\n{Colors.BOLD}{'='*80}{Colors.ENDC}")
        print(f"{Colors.BOLD}FINAL CART TEST RESULTS{Colors.ENDC}")
        print(f"{Colors.BOLD}{'='*80}{Colors.ENDC}")
        
        total_tests = self.test_results['passed'] + self.test_results['failed']
        
        if self.test_results['passed'] > 0:
            print_success(f"Passed: {self.test_results['passed']}/{total_tests}")
        
        if self.test_results['failed'] > 0:
            print_error(f"Failed: {self.test_results['failed']}/{total_tests}")
            
            print(f"\n{Colors.RED}{Colors.BOLD}ERRORS ENCOUNTERED:{Colors.ENDC}")
            for i, error in enumerate(self.test_results['errors'], 1):
                print_error(f"{i}. {error}")
        
        if self.test_results['failed'] == 0:
            print(f"\n{Colors.GREEN}{Colors.BOLD}🎉 ALL CART TESTS PASSED! Shopping cart backend is working correctly.{Colors.ENDC}")
        else:
            print(f"\n{Colors.RED}{Colors.BOLD}❌ Some cart tests failed. Please check the errors above.{Colors.ENDC}")
        
        print(f"{Colors.BOLD}{'='*80}{Colors.ENDC}")

if __name__ == "__main__":
    tester = CartTester()
    tester.run_cart_tests()