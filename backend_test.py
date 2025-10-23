#!/usr/bin/env python3
"""
Backend API Test Suite for 1804 Coins Application
Tests all authentication, product, and comment endpoints
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

class BackendTester:
    def __init__(self):
        self.token = None
        self.user_data = None
        self.admin_token = None
        self.admin_user_data = None
        self.comment_id = None
        self.created_product_id = None
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

    def test_auth_register(self):
        """Test user registration endpoint"""
        print_test_header("Auth - Register")
        
        # Use realistic test data
        test_user = {
            "username": "marie_claire",
            "email": "marie.claire@haiti.com", 
            "password": "Haiti1804!"
        }
        
        response = self.make_request('POST', '/auth/register', test_user)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Registration request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                if 'token' in data and 'user' in data:
                    self.token = data['token']
                    self.user_data = data['user']
                    print_success("Registration successful")
                    print_success(f"Token received: {self.token[:20]}...")
                    print_success(f"User ID: {self.user_data['id']}")
                    print_success(f"Username: {self.user_data['username']}")
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("Registration response missing token or user")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Registration response missing token or user")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from registration")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from registration")
                return False
        else:
            print_error(f"Registration failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Registration failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Registration failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_auth_login(self):
        """Test user login endpoint"""
        print_test_header("Auth - Login")
        
        login_data = {
            "email": "marie.claire@haiti.com",
            "password": "Haiti1804!"
        }
        
        response = self.make_request('POST', '/auth/login', login_data)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Login request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                if 'token' in data and 'user' in data:
                    self.token = data['token']  # Update token from login
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

    def test_get_products(self):
        """Test get all products endpoint"""
        print_test_header("Products - Get All")
        
        response = self.make_request('GET', '/products')
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Get products request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                products = response.json()
                if isinstance(products, list):
                    print_success(f"Retrieved {len(products)} products")
                    if len(products) == 6:
                        print_success("Correct number of products (6)")
                    else:
                        print_warning(f"Expected 6 products, got {len(products)}")
                    
                    # Check if products have required fields
                    if products:
                        first_product = products[0]
                        required_fields = ['id', 'name', 'description', 'price', 'image']
                        missing_fields = [field for field in required_fields if field not in first_product]
                        if not missing_fields:
                            print_success("Products have all required fields")
                        else:
                            print_warning(f"Products missing fields: {missing_fields}")
                    
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("Products response is not a list")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Products response is not a list")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from get products")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from get products")
                return False
        else:
            print_error(f"Get products failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Get products failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Get products failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_get_product_by_id(self):
        """Test get single product endpoint"""
        print_test_header("Products - Get One (Jean Jacques Dessalines)")
        
        response = self.make_request('GET', '/products/1')
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Get product by ID request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                product = response.json()
                if isinstance(product, dict):
                    print_success("Retrieved single product")
                    if product.get('name') == 'Emp. Jean Jacques Dessalines':
                        print_success("Correct product: Jean Jacques Dessalines")
                    else:
                        print_warning(f"Expected 'Emp. Jean Jacques Dessalines', got '{product.get('name')}'")
                    
                    # Check required fields
                    required_fields = ['id', 'name', 'description', 'price', 'image']
                    missing_fields = [field for field in required_fields if field not in product]
                    if not missing_fields:
                        print_success("Product has all required fields")
                    else:
                        print_warning(f"Product missing fields: {missing_fields}")
                    
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("Product response is not a dict")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Product response is not a dict")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from get product")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from get product")
                return False
        else:
            print_error(f"Get product failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Get product failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Get product failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_get_comments_empty(self):
        """Test get comments endpoint for Sanite Belair coin"""
        print_test_header("Comments - Get (Sanite Belair coin)")
        
        response = self.make_request('GET', '/products/3/comments')
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Get comments request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                comments = response.json()
                if isinstance(comments, list):
                    print_success(f"Retrieved comments list with {len(comments)} items")
                    if len(comments) == 0:
                        print_success("Comments list is empty as expected")
                    else:
                        print_warning(f"Expected empty list, got {len(comments)} comments")
                    
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("Comments response is not a list")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Comments response is not a list")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from get comments")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from get comments")
                return False
        else:
            print_error(f"Get comments failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Get comments failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Get comments failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_create_comment(self):
        """Test create comment endpoint (authenticated)"""
        print_test_header("Comments - Create (Authenticated)")
        
        if not self.token:
            print_error("No authentication token available")
            self.test_results['failed'] += 1
            self.test_results['errors'].append("No authentication token for comment creation")
            return False
        
        headers = {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json'
        }
        
        comment_data = {
            "comment": "Amazing coin! Sanite Belair was such a brave revolutionary fighter."
        }
        
        response = self.make_request('POST', '/products/3/comments', comment_data, headers)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Create comment request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                comment = response.json()
                if isinstance(comment, dict):
                    print_success("Comment created successfully")
                    
                    # Check required fields
                    required_fields = ['id', 'product_id', 'user_id', 'username', 'comment', 'timestamp']
                    missing_fields = [field for field in required_fields if field not in comment]
                    if not missing_fields:
                        print_success("Comment has all required fields")
                    else:
                        print_warning(f"Comment missing fields: {missing_fields}")
                    
                    if comment.get('comment') == comment_data['comment']:
                        print_success("Comment text matches input")
                    else:
                        print_warning("Comment text doesn't match input")
                    
                    if comment.get('product_id') == '3':
                        print_success("Comment associated with correct product (Sanite Belair)")
                    else:
                        print_warning("Comment not associated with correct product")
                    
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("Comment response is not a dict")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Comment response is not a dict")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from create comment")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from create comment")
                return False
        else:
            print_error(f"Create comment failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Create comment failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Create comment failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_get_comments_with_data(self):
        """Test get comments endpoint (should have 1 comment now)"""
        print_test_header("Comments - Get (After Creating Comment)")
        
        response = self.make_request('GET', '/products/1/comments')
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Get comments (with data) request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                comments = response.json()
                if isinstance(comments, list):
                    print_success(f"Retrieved comments list with {len(comments)} items")
                    if len(comments) >= 1:
                        print_success("Comments list has comments as expected")
                        
                        # Store comment ID for like testing
                        self.comment_id = comments[0]['id']
                        
                        # Check the comment structure
                        comment = comments[0]
                        required_fields = ['id', 'product_id', 'user_id', 'username', 'comment', 'timestamp']
                        missing_fields = [field for field in required_fields if field not in comment]
                        if not missing_fields:
                            print_success("Comment has all required fields")
                        else:
                            print_warning(f"Comment missing fields: {missing_fields}")
                        
                    else:
                        print_warning(f"Expected at least 1 comment, got {len(comments)} comments")
                    
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("Comments response is not a list")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Comments response is not a list")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from get comments")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from get comments")
                return False
        else:
            print_error(f"Get comments failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Get comments (with data) failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Get comments (with data) failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_auth_me(self):
        """Test /auth/me endpoint with token"""
        print_test_header("Auth - Get Current User (/me)")
        
        if not self.token:
            print_error("No authentication token available")
            self.test_results['failed'] += 1
            self.test_results['errors'].append("No authentication token for /me endpoint")
            return False
        
        headers = {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json'
        }
        
        response = self.make_request('GET', '/auth/me', headers=headers)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("/auth/me request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                user_data = response.json()
                if isinstance(user_data, dict):
                    print_success("Successfully retrieved current user data")
                    
                    # Check required fields
                    required_fields = ['id', 'username', 'email']
                    missing_fields = [field for field in required_fields if field not in user_data]
                    if not missing_fields:
                        print_success("User data has all required fields")
                    else:
                        print_warning(f"User data missing fields: {missing_fields}")
                    
                    if user_data.get('email') == 'marie.claire@haiti.com':
                        print_success("Correct user email returned")
                    else:
                        print_warning(f"Expected 'marie.claire@haiti.com', got '{user_data.get('email')}'")
                    
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("User data response is not a dict")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("User data response is not a dict")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from /auth/me")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from /auth/me")
                return False
        else:
            print_error(f"/auth/me failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"/auth/me failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"/auth/me failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_duplicate_registration(self):
        """Test duplicate registration (should fail)"""
        print_test_header("Auth - Duplicate Registration (Should Fail)")
        
        # Try to register with same email
        duplicate_user = {
            "username": "marie_claire2",
            "email": "marie.claire@haiti.com",  # Same email as before
            "password": "Haiti1804!"
        }
        
        response = self.make_request('POST', '/auth/register', duplicate_user)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Duplicate registration request failed - no response")
            return False
            
        if response.status_code == 400:
            print_success("Duplicate registration correctly rejected with 400 status")
            try:
                error_data = response.json()
                if 'detail' in error_data:
                    print_success(f"Error message: {error_data['detail']}")
                self.test_results['passed'] += 1
                return True
            except json.JSONDecodeError:
                print_warning("No JSON error details, but status code is correct")
                self.test_results['passed'] += 1
                return True
        else:
            print_error(f"Duplicate registration should fail with 400, got {response.status_code}")
            self.test_results['failed'] += 1
            self.test_results['errors'].append(f"Duplicate registration should fail with 400, got {response.status_code}")
            return False

    def test_wrong_password_login(self):
        """Test login with wrong password (should fail)"""
        print_test_header("Auth - Wrong Password Login (Should Fail)")
        
        wrong_login = {
            "email": "marie.claire@haiti.com",
            "password": "WrongPassword123!"
        }
        
        response = self.make_request('POST', '/auth/login', wrong_login)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Wrong password login request failed - no response")
            return False
            
        if response.status_code == 401:
            print_success("Wrong password login correctly rejected with 401 status")
            try:
                error_data = response.json()
                if 'detail' in error_data:
                    print_success(f"Error message: {error_data['detail']}")
                self.test_results['passed'] += 1
                return True
            except json.JSONDecodeError:
                print_warning("No JSON error details, but status code is correct")
                self.test_results['passed'] += 1
                return True
        else:
            print_error(f"Wrong password login should fail with 401, got {response.status_code}")
            self.test_results['failed'] += 1
            self.test_results['errors'].append(f"Wrong password login should fail with 401, got {response.status_code}")
            return False

    def test_nonexistent_product(self):
        """Test get non-existent product (should 404)"""
        print_test_header("Products - Get Non-existent Product (Should 404)")
        
        response = self.make_request('GET', '/products/999')
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Non-existent product request failed - no response")
            return False
            
        if response.status_code == 404:
            print_success("Non-existent product correctly returns 404 status")
            try:
                error_data = response.json()
                if 'detail' in error_data:
                    print_success(f"Error message: {error_data['detail']}")
                self.test_results['passed'] += 1
                return True
            except json.JSONDecodeError:
                print_warning("No JSON error details, but status code is correct")
                self.test_results['passed'] += 1
                return True
        else:
            print_error(f"Non-existent product should return 404, got {response.status_code}")
            self.test_results['failed'] += 1
            self.test_results['errors'].append(f"Non-existent product should return 404, got {response.status_code}")
            return False

    def test_comment_like_unlike(self):
        """Test comment like/unlike functionality"""
        print_test_header("Comments - Like/Unlike Toggle")
        
        if not self.token:
            print_error("No authentication token available")
            self.test_results['failed'] += 1
            self.test_results['errors'].append("No authentication token for comment liking")
            return False
        
        if not hasattr(self, 'comment_id') or not self.comment_id:
            print_error("No comment ID available for liking")
            self.test_results['failed'] += 1
            self.test_results['errors'].append("No comment ID available for liking")
            return False
        
        headers = {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json'
        }
        
        # Test liking the comment
        response = self.make_request('POST', f'/comments/{self.comment_id}/like', headers=headers)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Like comment request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                like_data = response.json()
                if 'likes' in like_data and like_data['likes'] >= 1:
                    print_success(f"Comment liked successfully, likes: {like_data['likes']}")
                    
                    # Test unliking the comment
                    response2 = self.make_request('POST', f'/comments/{self.comment_id}/like', headers=headers)
                    
                    if response2 and response2.status_code == 200:
                        unlike_data = response2.json()
                        if 'likes' in unlike_data and unlike_data['likes'] < like_data['likes']:
                            print_success(f"Comment unliked successfully, likes: {unlike_data['likes']}")
                            self.test_results['passed'] += 1
                            return True
                        else:
                            print_error("Unlike didn't decrease like count")
                            self.test_results['failed'] += 1
                            self.test_results['errors'].append("Unlike didn't decrease like count")
                            return False
                    else:
                        print_error("Unlike request failed")
                        self.test_results['failed'] += 1
                        self.test_results['errors'].append("Unlike request failed")
                        return False
                else:
                    print_error("Like didn't increase like count")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Like didn't increase like count")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from like comment")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from like comment")
                return False
        else:
            print_error(f"Like comment failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Like comment failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Like comment failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_admin_registration(self):
        """Test admin user registration"""
        print_test_header("Admin - Register Admin User")
        
        # Register admin user
        admin_user = {
            "username": "admin_user",
            "email": "testadmin@1804coins.com",
            "password": "admin123"
        }
        
        response = self.make_request('POST', '/auth/register', admin_user)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Admin registration request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                if 'token' in data and 'user' in data:
                    self.admin_token = data['token']
                    self.admin_user_data = data['user']
                    print_success("Admin registration successful")
                    print_success(f"Admin Token received: {self.admin_token[:20]}...")
                    print_success(f"Admin User ID: {self.admin_user_data['id']}")
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("Admin registration response missing token or user")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Admin registration response missing token or user")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from admin registration")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from admin registration")
                return False
        else:
            print_error(f"Admin registration failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Admin registration failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Admin registration failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_admin_login(self):
        """Test admin user login"""
        print_test_header("Admin - Login Admin User")
        
        admin_login = {
            "email": "testadmin@1804coins.com",
            "password": "admin123"
        }
        
        response = self.make_request('POST', '/auth/login', admin_login)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Admin login request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                if 'token' in data and 'user' in data:
                    self.admin_token = data['token']  # Update admin token
                    self.admin_user_data = data['user']
                    print_success("Admin login successful")
                    print_success(f"Admin Token received: {self.admin_token[:20]}...")
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("Admin login response missing token or user")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Admin login response missing token or user")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from admin login")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from admin login")
                return False
        else:
            print_error(f"Admin login failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Admin login failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Admin login failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_admin_check_status(self):
        """Test admin status check"""
        print_test_header("Admin - Check Admin Status")
        
        if not hasattr(self, 'admin_token') or not self.admin_token:
            print_error("No admin token available")
            self.test_results['failed'] += 1
            self.test_results['errors'].append("No admin token for status check")
            return False
        
        headers = {
            'Authorization': f'Bearer {self.admin_token}',
            'Content-Type': 'application/json'
        }
        
        response = self.make_request('GET', '/admin/check', headers=headers)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Admin check request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                admin_data = response.json()
                if admin_data.get('is_admin') == True:
                    print_success("Admin status confirmed")
                    print_success(f"Admin email: {admin_data.get('email')}")
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("User is not recognized as admin")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("User is not recognized as admin")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from admin check")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from admin check")
                return False
        else:
            print_error(f"Admin check failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Admin check failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Admin check failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_admin_get_products(self):
        """Test admin get all products"""
        print_test_header("Admin - Get All Products")
        
        if not hasattr(self, 'admin_token') or not self.admin_token:
            print_error("No admin token available")
            self.test_results['failed'] += 1
            self.test_results['errors'].append("No admin token for get products")
            return False
        
        headers = {
            'Authorization': f'Bearer {self.admin_token}',
            'Content-Type': 'application/json'
        }
        
        response = self.make_request('GET', '/admin/products', headers=headers)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Admin get products request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                products = response.json()
                if isinstance(products, list):
                    print_success(f"Admin retrieved {len(products)} products")
                    if len(products) >= 6:
                        print_success("Expected number of products retrieved")
                    else:
                        print_warning(f"Expected at least 6 products, got {len(products)}")
                    
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("Admin products response is not a list")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Admin products response is not a list")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from admin get products")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from admin get products")
                return False
        else:
            print_error(f"Admin get products failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Admin get products failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Admin get products failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_admin_create_product(self):
        """Test admin create product"""
        print_test_header("Admin - Create New Product")
        
        if not hasattr(self, 'admin_token') or not self.admin_token:
            print_error("No admin token available")
            self.test_results['failed'] += 1
            self.test_results['errors'].append("No admin token for create product")
            return False
        
        headers = {
            'Authorization': f'Bearer {self.admin_token}',
            'Content-Type': 'application/json'
        }
        
        new_product = {
            "name": "Test Revolutionary Hero",
            "description": "A test commemorative coin for testing purposes",
            "price": 30.00,
            "image": "https://example.com/test-coin.png",
            "status": "in_stock",
            "category": "test",
            "featured": False,
            "year": "2025",
            "material": "Test material",
            "weight": "30g",
            "diameter": "40mm",
            "mintage": "Test Edition"
        }
        
        response = self.make_request('POST', '/admin/products', new_product, headers)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Admin create product request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                product = response.json()
                if isinstance(product, dict) and product.get('name') == new_product['name']:
                    self.created_product_id = product.get('id')
                    print_success("Product created successfully")
                    print_success(f"Created product ID: {self.created_product_id}")
                    print_success(f"Product name: {product.get('name')}")
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("Created product response invalid")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Created product response invalid")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from admin create product")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from admin create product")
                return False
        else:
            print_error(f"Admin create product failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Admin create product failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Admin create product failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_admin_update_product(self):
        """Test admin update product"""
        print_test_header("Admin - Update Product")
        
        if not hasattr(self, 'admin_token') or not self.admin_token:
            print_error("No admin token available")
            self.test_results['failed'] += 1
            self.test_results['errors'].append("No admin token for update product")
            return False
        
        if not hasattr(self, 'created_product_id') or not self.created_product_id:
            print_error("No created product ID available")
            self.test_results['failed'] += 1
            self.test_results['errors'].append("No created product ID for update")
            return False
        
        headers = {
            'Authorization': f'Bearer {self.admin_token}',
            'Content-Type': 'application/json'
        }
        
        update_data = {
            "name": "Updated Test Revolutionary Hero",
            "price": 35.00,
            "description": "Updated test commemorative coin description"
        }
        
        response = self.make_request('PUT', f'/admin/products/{self.created_product_id}', update_data, headers)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Admin update product request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                product = response.json()
                if isinstance(product, dict) and product.get('name') == update_data['name']:
                    print_success("Product updated successfully")
                    print_success(f"Updated product name: {product.get('name')}")
                    print_success(f"Updated product price: {product.get('price')}")
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("Updated product response invalid")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Updated product response invalid")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from admin update product")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from admin update product")
                return False
        else:
            print_error(f"Admin update product failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Admin update product failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Admin update product failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_admin_delete_product(self):
        """Test admin delete product"""
        print_test_header("Admin - Delete Product")
        
        if not hasattr(self, 'admin_token') or not self.admin_token:
            print_error("No admin token available")
            self.test_results['failed'] += 1
            self.test_results['errors'].append("No admin token for delete product")
            return False
        
        if not hasattr(self, 'created_product_id') or not self.created_product_id:
            print_error("No created product ID available")
            self.test_results['failed'] += 1
            self.test_results['errors'].append("No created product ID for delete")
            return False
        
        headers = {
            'Authorization': f'Bearer {self.admin_token}',
            'Content-Type': 'application/json'
        }
        
        response = self.make_request('DELETE', f'/admin/products/{self.created_product_id}', headers=headers)
        
        if not response:
            self.test_results['failed'] += 1
            self.test_results['errors'].append("Admin delete product request failed - no response")
            return False
            
        if response.status_code == 200:
            try:
                result = response.json()
                if result.get('message') and 'deleted' in result.get('message', '').lower():
                    print_success("Product deleted successfully")
                    print_success(f"Delete message: {result.get('message')}")
                    self.test_results['passed'] += 1
                    return True
                else:
                    print_error("Delete product response invalid")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Delete product response invalid")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from admin delete product")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Invalid JSON response from admin delete product")
                return False
        else:
            print_error(f"Admin delete product failed with status {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Error details: {error_data}")
                self.test_results['errors'].append(f"Admin delete product failed: {error_data}")
            except:
                print_error(f"Error response: {response.text}")
                self.test_results['errors'].append(f"Admin delete product failed: {response.text}")
            self.test_results['failed'] += 1
            return False

    def test_image_upload(self):
        """Test image upload endpoint"""
        print_test_header("Image Upload - Mock File Upload")
        
        # Create a mock image file for testing
        import io
        
        # Create a simple test image content (1x1 pixel PNG)
        test_image_content = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\tpHYs\x00\x00\x0b\x13\x00\x00\x0b\x13\x01\x00\x9a\x9c\x18\x00\x00\x00\x0cIDATx\x9cc```\x00\x00\x00\x04\x00\x01\xdd\xcc\xdb\x1d\x00\x00\x00\x00IEND\xaeB`\x82'
        
        try:
            import requests
            
            files = {
                'file': ('test.png', io.BytesIO(test_image_content), 'image/png')
            }
            
            url = f"{API_URL}/upload-image"
            print_info(f"Making POST request to: {url}")
            print_info("Uploading test image file")
            
            response = requests.post(url, files=files, timeout=30)
            
            print_info(f"Response status: {response.status_code}")
            
            if response.headers.get('content-type', '').startswith('application/json'):
                try:
                    response_data = response.json()
                    print_info(f"Response body: {json.dumps(response_data, indent=2)}")
                except:
                    print_info(f"Response body (text): {response.text}")
            else:
                print_info(f"Response body (text): {response.text}")
            
            if response.status_code == 200:
                try:
                    upload_data = response.json()
                    if 'url' in upload_data:
                        print_success("Image uploaded successfully")
                        print_success(f"Image URL: {upload_data['url']}")
                        self.test_results['passed'] += 1
                        return True
                    else:
                        print_error("Upload response missing URL")
                        self.test_results['failed'] += 1
                        self.test_results['errors'].append("Upload response missing URL")
                        return False
                except json.JSONDecodeError:
                    print_error("Invalid JSON response from image upload")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Invalid JSON response from image upload")
                    return False
            else:
                print_error(f"Image upload failed with status {response.status_code}")
                try:
                    error_data = response.json()
                    print_error(f"Error details: {error_data}")
                    self.test_results['errors'].append(f"Image upload failed: {error_data}")
                except:
                    print_error(f"Error response: {response.text}")
                    self.test_results['errors'].append(f"Image upload failed: {response.text}")
                self.test_results['failed'] += 1
                return False
                
        except Exception as e:
            print_error(f"Image upload test failed with exception: {str(e)}")
            self.test_results['failed'] += 1
            self.test_results['errors'].append(f"Image upload test failed: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend API tests in sequence"""
        print(f"\n{Colors.BOLD}{'='*80}{Colors.ENDC}")
        print(f"{Colors.BOLD}1804 COINS COMPREHENSIVE BACKEND API TEST SUITE{Colors.ENDC}")
        print(f"{Colors.BOLD}Testing Backend URL: {BASE_URL}{Colors.ENDC}")
        print(f"{Colors.BOLD}Testing API URL: {API_URL}{Colors.ENDC}")
        print(f"{Colors.BOLD}{'='*80}{Colors.ENDC}")
        
        # Comprehensive test sequence as specified in the review request
        tests = [
            # Authentication Tests
            ("1. Auth - Register", self.test_auth_register),
            ("2. Auth - Login", self.test_auth_login),
            ("3. Auth - Get Current User (/me)", self.test_auth_me),
            ("4. Auth - Duplicate Registration (Should Fail)", self.test_duplicate_registration),
            ("5. Auth - Wrong Password Login (Should Fail)", self.test_wrong_password_login),
            
            # Products Tests
            ("6. Products - Get All", self.test_get_products),
            ("7. Products - Get One (Dessalines)", self.test_get_product_by_id),
            ("8. Products - Get Non-existent (Should 404)", self.test_nonexistent_product),
            
            # Comments Tests (requires auth)
            ("9. Comments - Get (Sanite Belair coin)", self.test_get_comments_empty),
            ("10. Comments - Create (Authenticated)", self.test_create_comment),
            ("11. Comments - Get (After Creating)", self.test_get_comments_with_data),
            ("12. Comments - Like/Unlike Toggle", self.test_comment_like_unlike),
            
            # Admin Tests
            ("13. Admin - Register Admin User", self.test_admin_registration),
            ("14. Admin - Login Admin User", self.test_admin_login),
            ("15. Admin - Check Admin Status", self.test_admin_check_status),
            ("16. Admin - Get All Products", self.test_admin_get_products),
            ("17. Admin - Create New Product", self.test_admin_create_product),
            ("18. Admin - Update Product", self.test_admin_update_product),
            ("19. Admin - Delete Product", self.test_admin_delete_product),
            
            # Image Upload Test
            ("20. Image Upload - Mock File Upload", self.test_image_upload),
        ]
        
        for test_name, test_func in tests:
            try:
                test_func()
            except Exception as e:
                print_error(f"Test '{test_name}' crashed: {str(e)}")
                self.test_results['failed'] += 1
                self.test_results['errors'].append(f"Test '{test_name}' crashed: {str(e)}")
        
        # Print final results
        self.print_final_results()

    def print_final_results(self):
        """Print final test results summary"""
        print(f"\n{Colors.BOLD}{'='*80}{Colors.ENDC}")
        print(f"{Colors.BOLD}FINAL TEST RESULTS{Colors.ENDC}")
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
            print(f"\n{Colors.GREEN}{Colors.BOLD}🎉 ALL TESTS PASSED! Backend API is working correctly.{Colors.ENDC}")
        else:
            print(f"\n{Colors.RED}{Colors.BOLD}❌ Some tests failed. Please check the errors above.{Colors.ENDC}")
        
        print(f"{Colors.BOLD}{'='*80}{Colors.ENDC}")

if __name__ == "__main__":
    tester = BackendTester()
    tester.run_all_tests()