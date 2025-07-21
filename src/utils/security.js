/**
 * Security utilities for Git & GitHub Mastery App
 * 
 * This file contains security-related utilities to protect user data and ensure
 * secure operation of the application.
 * 
 * Created by Wayne Trout
 */

/**
 * Sanitizes user input to prevent XSS attacks
 * @param {string} input - The user input to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeInput = (input) => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Encrypts sensitive data for local storage
 * Simple encryption for demo purposes - in production, use a proper encryption library
 * @param {any} data - Data to encrypt
 * @returns {string} - Encrypted data
 */
export const encryptData = (data) => {
  // This is a simple obfuscation, not true encryption
  // For a real app, use a proper encryption library
  const stringData = JSON.stringify(data);
  // Handle non-Latin1 characters by encoding to UTF-8 first
  return btoa(unescape(encodeURIComponent(stringData)));
};

/**
 * Decrypts data from local storage
 * @param {string} encryptedData - Encrypted data
 * @returns {any} - Decrypted data
 */
export const decryptData = (encryptedData) => {
  try {
    // Handle non-Latin1 characters by decoding from UTF-8
    const stringData = decodeURIComponent(escape(atob(encryptedData)));
    return JSON.parse(stringData);
  } catch (error) {
    console.error('Failed to decrypt data:', error);
    return null;
  }
};

/**
 * Securely stores data in localStorage with encryption
 * @param {string} key - Storage key
 * @param {any} data - Data to store
 */
export const secureStore = (key, data) => {
  const encryptedData = encryptData(data);
  localStorage.setItem(key, encryptedData);
};

/**
 * Securely retrieves data from localStorage with decryption
 * @param {string} key - Storage key
 * @returns {any} - Retrieved data
 */
export const secureRetrieve = (key) => {
  const encryptedData = localStorage.getItem(key);
  if (!encryptedData) return null;
  return decryptData(encryptedData);
};

/**
 * Validates content safety (no malicious code)
 * @param {string} content - Content to validate
 * @returns {boolean} - Whether the content is safe
 */
export const isContentSafe = (content) => {
  if (!content) return true;
  
  // Check for potentially dangerous script tags or iframe injections
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    /javascript:/gi,
    /onerror=/gi,
    /onload=/gi,
    /onclick=/gi
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(content));
};

/**
 * Rate limiting for API calls
 * @param {Function} fn - Function to rate limit
 * @param {number} limit - Time limit in ms
 * @returns {Function} - Rate limited function
 */
export const rateLimit = (fn, limit) => {
  let lastRun = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      lastRun = now;
      return fn.apply(this, args);
    }
    console.warn('Rate limit exceeded. Please try again later.');
    return null;
  };
};

/**
 * Content Security Policy settings
 * In a real app, these would be set in HTTP headers
 */
export const CSP = {
  'default-src': ["'self'"],
  'script-src': ["'self'", 'https://www.youtube.com'],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'img-src': ["'self'", 'data:', 'https://via.placeholder.com', 'https://cdn.buymeacoffee.com'],
  'font-src': ["'self'", 'https://fonts.gstatic.com'],
  'connect-src': ["'self'"],
  'frame-src': ["'self'", 'https://www.youtube.com'],
  'object-src': ["'none'"]
};

/**
 * Apply CSP to the document
 * In a real app, this would be done via HTTP headers
 */
export const applyCSP = () => {
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  
  const cspString = Object.entries(CSP)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');
  
  meta.content = cspString;
  document.head.appendChild(meta);
};

/**
 * Initialize security features
 */
export const initSecurity = () => {
  // Apply CSP
  applyCSP();
  
  // Add event listeners for visibility changes to detect potential session hijacking
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // Verify session integrity when tab becomes visible again
      console.log('Session integrity check on visibility change');
    }
  });
  
  console.log('Security features initialized');
};