import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center">
                    <p className="text-black text-sm">
                        &copy; {new Date().getFullYear()} Udaan Abhay Singh
                    </p>
                </div>
                
                <div className="mt-4 flex justify-center space-x-6">
                    <a 
                        href="/home" 
                        className="text-black hover:text-gray-700 text-sm transition-colors duration-200"
                    >
                        Terms and conditions
                    </a>
                    <a 
                        href="https://en.wikipedia.org/wiki/Privacy" 
                        className="text-black hover:text-gray-700 text-sm transition-colors duration-200"
                    >
                        Privacy
                    </a>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
