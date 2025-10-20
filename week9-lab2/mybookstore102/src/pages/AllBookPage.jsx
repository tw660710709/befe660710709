import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpenIcon, LogoutIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';

const AllBookPage = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // Check authentication
        const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
        if (!isAuthenticated) {
            navigate('/login');
        }
        setLoading(true);
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const res = await fetch('http://localhost:8080/api/v1/books');
                const data = await res.json();
                console.log("fetch sessuesfully");
                setBooks(data);
                setFilteredBooks(data);
            } catch (err) {
                console.error('Error fetching books:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [navigate]);

    const goToAddBook = () => {
        navigate('/store-manager/add-book');
    }

    const handleLogout = () => {
        localStorage.removeItem('isAdminAuthenticated');
        navigate('/login');
    };



    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <BookOpenIcon className="h-8 w-8" />
                            <h1 className="text-2xl font-bold">BookStore - BackOffice</h1>
                        </div>
                        <div className='flex item-center mr-10 space-x-3'>
                            <button
                                onClick={goToAddBook}
                                className="flex items-center space-x-2 px-3 bg-white text-green-800 rounded-lg"
                            >
                                <PlusIcon className="h-5 w-5" />

                                <span>เพิ่มหนังสือ</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-green/30
                                        rounded-lg transition-colors"
                            >
                                <LogoutIcon className="h-5 w-5" />
                                <span>ออกจากระบบ</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container mx-auto px-4 py-6">
                <div className=" flex justify-between m-10 ml-20">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">จัดการหนังสือทั้งหมด</h1>
                    <div className="mt-3 text-sm text-gray-600">
                        พบหนังสือ {books.length} เล่ม
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">จัดการ</th>

                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {books.map((book) => (
                                <tr key={book.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{book.id}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{book.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{book.isbn}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{book.year}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">฿{book.price}</td>
                                    <td className="px-3 py-4 whitespace-nowrap space-x-4">
                                        <button className=""><PencilIcon className="h-5 w-5 text-blue-800" /></button>
                                        <button className=""><TrashIcon className="h-5 w-5 text-red-800" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};




export default AllBookPage;