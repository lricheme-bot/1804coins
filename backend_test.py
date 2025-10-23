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
        """Test get comments endpoint (should be empty initially)"""
        print_test_header("Comments - Get (Initially Empty)")
        
        response = self.make_request('GET', '/products/1/comments')
        
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
            "comment": "This coin represents such an important part of Haitian history! Jean Jacques Dessalines was truly a revolutionary leader."
        }
        
        response = self.make_request('POST', '/products/1/comments', comment_data, headers)
        
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
                    
                    if comment.get('product_id') == '1':
                        print_success("Comment associated with correct product")
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
                    if len(comments) == 1:
                        print_success("Comments list has 1 comment as expected")
                        
                        # Check the comment structure
                        comment = comments[0]
                        required_fields = ['id', 'product_id', 'user_id', 'username', 'comment', 'timestamp']
                        missing_fields = [field for field in required_fields if field not in comment]
                        if not missing_fields:
                            print_success("Comment has all required fields")
                        else:
                            print_warning(f"Comment missing fields: {missing_fields}")
                        
                    else:
                        print_warning(f"Expected 1 comment, got {len(comments)} comments")
                    
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

    def run_all_tests(self):
        """Run all backend API tests in sequence"""
        print(f"\n{Colors.BOLD}{'='*80}{Colors.ENDC}")
        print(f"{Colors.BOLD}1804 COINS BACKEND API TEST SUITE{Colors.ENDC}")
        print(f"{Colors.BOLD}Testing Backend URL: {BASE_URL}{Colors.ENDC}")
        print(f"{Colors.BOLD}Testing API URL: {API_URL}{Colors.ENDC}")
        print(f"{Colors.BOLD}{'='*80}{Colors.ENDC}")
        
        # Test sequence as specified in the review request
        tests = [
            ("1. Auth - Register", self.test_auth_register),
            ("2. Auth - Login", self.test_auth_login),
            ("3. Products - Get All", self.test_get_products),
            ("4. Products - Get One", self.test_get_product_by_id),
            ("5. Comments - Get (Empty)", self.test_get_comments_empty),
            ("6. Comments - Create", self.test_create_comment),
            ("7. Comments - Get (With Data)", self.test_get_comments_with_data),
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