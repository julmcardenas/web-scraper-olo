import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Navbar from "../components/NavBar";
import axios from "axios";

interface Video {
    title: string;
    thumbnail: string;
    link: string;
}

interface ProductReview {
    _id: string;
    product: string;
    date: string;
    review: string;
    pros: string[];
    cons: string[];
    userId: string;
    score: number;
    videos: Video[];
}

function CheckIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}

function XIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    );
}

const mock_data = [
    {
        _id: '1',
        product: "Noise-Cancelling Headphones",
        review:
            "High-quality noise-cancelling headphones with advanced audio technology for an immersive listening experience.",
        pros: [
            "Excellent noise-cancellation performance",
            "Comfortable and adjustable design",
            "Long battery life",
            "Wireless connectivity",
        ],
        cons: ["Expensive compared to regular headphones", "May not be suitable for sports or outdoor activities"],
        videos: [{
            title: "Video 1",
            thumbnail: "https://via.placeholder.com/500x300",
            link: "https://www.youtube.com/watch?v=abcdefghijk",
        }, {
            title: "Video 2",
            thumbnail: "https://via.placeholder.com/500x300",
            link: "https://www.youtube.com/watch?v=lmnopqrst",
        }],
        date: '2021-09-01',
        userId: '1',
        score: 4.5,
    },
    {
        _id: '2',
        product: "Smartphone",
        review:
            "High-quality smartphone with advanced features for an immersive user experience.",
        pros: [
            "High-resolution display",
            "Long battery life",
            "Fast performance",
            "High-quality camera",
        ],
        cons: ["Expensive compared to regular phones", "May not be suitable for budget-conscious users"],
        videos: [{
            title: "Video 1",
            thumbnail: "https://via.placeholder.com/500x300",
            link: "https://www.youtube.com/watch?v=abcdefghijk",
        }, {
            title: "Video 2",
            thumbnail: "https://via.placeholder.com/500x300",
            link: "https://www.youtube.com/watch?v=lmnopqrst",
        }],
        date: '2021-09-02',
        userId: '1',
        score: 4.0,
    },
]

export default function Product() {
    const { id } = useParams();
    const [productReview, setProductReview] = useState<ProductReview | null>(null);


    useEffect(() => {
        // Fetch the search history data from the API
        const fetchHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/product/${id}`);
                console.log('response', response);
                // if no such product exists, then return 404 screen
                if (!response.data.message) {
                    setProductReview(null);
                    return;
                }
                console.log('response-front', response);
                setProductReview(response.data.message[0]);
            } catch (error) {
                console.error('Error fetching search history:', error);
            }
        };

        fetchHistory();

    }, []);

    if (!productReview) {
        return (
            <>
                <Navbar isLoggedIn={false} />
                <div className="flex items-center justify-center h-screen"><h1 className="text-3xl">404: Product not found</h1></div>
            </>
        );
    }


    return (
        <>
            <Navbar isLoggedIn={false} />
            <div className="min-h-screen bg-[#f7f3f0] flex flex-col items-center p-4 mt-8">
                <main className="w-full max-w-5xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 row-span-1">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-black">{productReview.product}</h1>
                            <div className="mt-2 flex justify-center items-center space-x-2">
                                <Badge variant="secondary" className="text-lg">
                                    {productReview.score}
                                </Badge>
                                <span className="text-lg font-semibold text-green-600">Great</span>
                            </div>
                            <div className="mt-4">
                                {productReview.videos[0] ? (
                                    <div
                                        key={productReview.videos[0].link}
                                        className="relative aspect-w-5 aspect-h-3 h-[300px] w-[500px] p-4 rounded-lg border border-black cursor-pointer bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(${productReview.videos[0].thumbnail})`,
                                        }}
                                        onClick={() => window.open(productReview.videos[0].link, "_blank", "noopener,noreferrer")}
                                    ></div>
                                ) : (
                                    <div>No video available</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 row-span-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">Our Verdict</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{productReview.review}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">Check out the videos:</CardTitle>
                            </CardHeader>

                            <CardContent>
                                {productReview.videos.map((video, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            aspectRatio: "500/300",
                                            objectFit: "cover",
                                            height: "300",
                                            width: "500",
                                            padding: "1em",
                                            borderRadius: "1em",
                                            border: "1px solid black",
                                            cursor: "pointer",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundImage: `url(${video?.thumbnail})`, // Optional: Set a background thumbnail
                                        }}
                                        onClick={() => window.open(video.link, "_blank", "noopener,noreferrer")}
                                    ></div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-span-1 row-span-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">Pros</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-4">
                                    {productReview.pros.map((pro, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <CheckIcon className="text-green-600" />
                                            <span>{pro}</span>
                                        </div>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">Cons</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-4">
                                    {productReview.cons.map((con, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <XIcon className="text-red-600" />
                                            <span>{con}</span>
                                        </div>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-span-1 row-span-3">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">What people are saying</CardTitle>
                            </CardHeader>
                            <CardContent>{''}</CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </>
    );
}
