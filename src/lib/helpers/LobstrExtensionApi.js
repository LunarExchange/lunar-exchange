/**
 * LOBSTR Signer Extension API Polyfill
 * 
 * This module provides a compatibility layer for interacting with the LOBSTR
 * browser extension. The @lobstrco/signer-extension-api package doesn't exist
 * on npm, so we implement the necessary functions directly.
 * 
 * The LOBSTR extension injects a global object that can be accessed via window.
 */

const EXTENSION_ID = 'ldiagbjmlmjiieclmdkagofdjcgodjle';
const TIMEOUT = 15000; // 15 seconds

/**
 * Check if LOBSTR extension is installed and connected
 * @returns {Promise<boolean>}
 */
export async function isConnected() {
    try {
        // Check if the extension API is available in window
        if (typeof window === 'undefined') {
            return false;
        }

        // LOBSTR extension injects a global object
        if (window.lobstrExtension) {
            return true;
        }

        // Alternative: Check if extension is installed via postMessage
        return new Promise((resolve) => {
            const timeout = setTimeout(() => {
                resolve(false);
            }, 1000);

            const handleMessage = (event) => {
                if (event.data && event.data.type === 'LOBSTR_EXTENSION_RESPONSE') {
                    clearTimeout(timeout);
                    window.removeEventListener('message', handleMessage);
                    resolve(true);
                }
            };

            window.addEventListener('message', handleMessage);
            window.postMessage({ type: 'LOBSTR_EXTENSION_CHECK' }, '*');
        });
    } catch (error) {
        console.error('Error checking LOBSTR extension:', error);
        return false;
    }
}

/**
 * Get public key from LOBSTR extension
 * @returns {Promise<string>} - Stellar public key
 */
export async function getPublicKey() {
    try {
        if (!await isConnected()) {
            throw new Error('LOBSTR extension is not connected');
        }

        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('LOBSTR extension timeout: No response from extension'));
            }, TIMEOUT);

            const handleMessage = (event) => {
                if (event.data && event.data.type === 'LOBSTR_PUBLIC_KEY_RESPONSE') {
                    clearTimeout(timeout);
                    window.removeEventListener('message', handleMessage);

                    if (event.data.error) {
                        reject(new Error(event.data.error));
                    } else if (event.data.publicKey) {
                        resolve(event.data.publicKey);
                    } else {
                        reject(new Error('No public key received from LOBSTR extension'));
                    }
                }
            };

            window.addEventListener('message', handleMessage);
            window.postMessage({
                type: 'LOBSTR_GET_PUBLIC_KEY',
                source: 'lunar-exchange',
            }, '*');
        });
    } catch (error) {
        throw new Error(`Failed to get public key from LOBSTR: ${error.message}`);
    }
}

/**
 * Sign transaction with LOBSTR extension
 * @param {string} xdr - Transaction XDR to sign
 * @param {object} options - Optional parameters
 * @returns {Promise<string>} - Signed transaction XDR
 */
export async function signTransaction(xdr, options = {}) {
    try {
        if (!await isConnected()) {
            throw new Error('LOBSTR extension is not connected');
        }

        if (!xdr || typeof xdr !== 'string') {
            throw new Error('Invalid transaction XDR');
        }

        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('LOBSTR extension timeout: No response from extension'));
            }, TIMEOUT);

            const handleMessage = (event) => {
                if (event.data && event.data.type === 'LOBSTR_SIGN_RESPONSE') {
                    clearTimeout(timeout);
                    window.removeEventListener('message', handleMessage);

                    if (event.data.error) {
                        reject(new Error(event.data.error));
                    } else if (event.data.signedXDR) {
                        resolve(event.data.signedXDR);
                    } else {
                        reject(new Error('No signed transaction received from LOBSTR extension'));
                    }
                }
            };

            window.addEventListener('message', handleMessage);
            window.postMessage({
                type: 'LOBSTR_SIGN_TRANSACTION',
                source: 'lunar-exchange',
                xdr,
                ...options,
            }, '*');
        });
    } catch (error) {
        throw new Error(`Failed to sign transaction with LOBSTR: ${error.message}`);
    }
}

/**
 * Get extension version
 * @returns {Promise<string>}
 */
export async function getVersion() {
    try {
        if (window.lobstrExtension && window.lobstrExtension.version) {
            return window.lobstrExtension.version;
        }
        return 'unknown';
    } catch (error) {
        console.error('Error getting LOBSTR extension version:', error);
        return 'unknown';
    }
}

export default {
    isConnected,
    getPublicKey,
    signTransaction,
    getVersion,
};
