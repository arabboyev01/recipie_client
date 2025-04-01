import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <header className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                    <Link href="/">
                        <span className="text-xl font-bold cursor-pointer">Recipe App</span>
                    </Link>
                </div>

                <form onSubmit={handleSearch} className="w-full md:w-1/3">
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search recipes..."
                            className="w-full px-4 py-2 rounded-l text-[white] bg-gray-800"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </header>
    );
};

export default Header;