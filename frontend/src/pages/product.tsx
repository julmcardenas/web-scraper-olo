import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Navbar from "../components/NavBar";
import axios from "axios";
// import "../app.css";

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
    comments: string[]; // Added comments field
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

export default function Product() {
    const { id } = useParams();
    const [productReview, setProductReview] = useState<ProductReview | null>(null);

    useEffect(() => {
        const fetchProductReview = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/${id}`);
                if (response.data.message) {
                    setProductReview(response.data.message[0]);
                } else {
                    setProductReview(null);
                }
            } catch (error) {
                console.error('Error fetching product review:', error);
            }
        };

        fetchProductReview();
    }, [id]);

    if (!productReview) {
        return (
            <>
                <Navbar isLoggedIn={false}/>
                <div className="flex items-center justify-center min-h-screen">
                    <h1 className="text-3xl">404: Product not found</h1>
                </div>
            </>
        );
    }

    // Function to determine the badge text and color based on the score
    const getBadgeDetails = (score: number) => {
        if (score <= 49) {
            return { text: "Not recommended", color: "text-0" };
        } else if (score >= 50 && score <= 59) {
            return { text: "Unpopular", color: "text-50" };
        } else if (score >= 60 && score <= 74) {
            return { text: "Decent", color: "text-60" };
        } else if (score >= 75 && score <= 89) {
            return { text: "Recommended", color: "text-75" };
        } else if (score >= 90 && score <= 100) {
            return { text: "Popular!", color: "text-90" };
        }
        return { text: "", color: "text-black" }; // Default case
    };

    const { text: badgeText, color: badgeColor } = getBadgeDetails(productReview.score);

    return (
        <>
            <Navbar isLoggedIn={false}/>
            <div className="min-h-screen bg-[#f7f3f0] flex flex-col items-center p-4">
                <main className="w-full max-w-5xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 row-span-1">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-black">{productReview.product}</h1>
                            <div className="mt-2 flex justify-center items-center space-x-2">
                                <Badge
                                    variant="success"
                                    className={`font-extrabold text-6xl p-8 ${badgeColor}`}
                                >
                                    {productReview.score}
                                </Badge>
                                <span className={`text-xl font-bold mt-2 ${badgeColor}`}>
                                    {badgeText}
                                </span>
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
                                            height: "300px",
                                            width: "500px",
                                            padding: "1em",
                                            borderRadius: "1em",
                                            border: "1px solid black",
                                            cursor: "pointer",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundImage: `url(${video?.thumbnail})`,
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
                                        <li key={index} className="flex items-center space-x-2">
                                            <CheckIcon className="text-green-600" style={{ fontSize: "1.25rem", minWidth: "1.25rem", minHeight: "1.25rem" }} />
                                            <span>{pro}</span>
                                        </li>
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
                                        <li key={index} className="flex items-center space-x-2">
                                            <XIcon className="text-red-600" style={{ fontSize: "1.25rem", minWidth: "1.25rem", minHeight: "1.25rem" }} />
                                            <span>{con}</span>
                                        </li>
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
                            <CardContent>
                                <div className="comments-container space-y-4">
                                    {productReview.comments && productReview.comments.length > 0 ? (
                                        productReview.comments.map((comment, index) => (
                                            <div key={index} className="comment p-4 bg-gray-100 rounded-md">
                                                <p className="text-md text-gray-800">{comment}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-md text-gray-600">No comments yet</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </>
    );
}
