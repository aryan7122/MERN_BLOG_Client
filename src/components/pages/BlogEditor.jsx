import React, { useState } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import '../../assets/Styles/customStyles.css'
const BlogEditor = () => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    console.log('category', category)

    const handleSave = async () => {
        try {

            const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/posts`, {
                title,
                url,
                description,
                content,
                category
            });
            console.log("Post saved successfully:", response.data);
            setMessage("Post Published successfully!");
            // You can redirect the user to another page after saving the post if needed
        } catch (error) {
            console.error("Error saving post:", error);
            setMessage("Error saving post.");
        }
    };

    return (
        <div className="border p-3    w-full">
            <h3 className="text-2xl font-bold">Add New Post</h3>
            <button className="bg-black text-white p-3 rounded-md text-2xl mb-3 mt-2" onClick={handleSave}>Publish</button>
            {message && <p className="mb-2">{message}</p>}
            <div className="mb-2 grid grid-cols-1 gap-5 ">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    type="text"
                    name="title"
                    placeholder="Enter blog title"
                    className="border mr-2 h-14 p-1 text-2xl bold"
                />
                <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    type="text"
                    name="url_img"
                    placeholder="Image URL"
                    className="border mr-2 h-10 text-sm p-1"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    type="text"
                    name="description"
                    placeholder="Description about post..."
                    className="border mr-2 p-1 h-20 text-lg"
                />
                <div className="border mr-2  p-1 text-2xl bold grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6  xl:grid-cols-7 xl:pl-10  gap-4 w-full h-fit">
                    {/* <h1 className="text-sm text-center  font-bold text-gray-600  z-30">Category:</h1> */}
                    {["Motivation", "Book Summary", "Self Development", "Story", "Life Fact", "Health","Psychology"].map((cat) => (
                        <div key={cat} className="flex gap-2 border w-fit  hover:border-green-700 rounded-sm cursor-alias ">
                            <input
                                value={cat}
                                onChange={(e) => setCategory(e.target.value)}
                                checked={category === cat}
                                type="radio"
                                name="category"
                                className="custom-radio"
                                placeholder="Category"
                                required
                            />
                            <h1 className="absolute p-2">{cat}</h1>
                        </div>
                    ))}
                </div>
            </div>
            <JoditEditor
                className=""
                value={content}
                tabIndex={1}
                onChange={(newContent) => setContent(newContent)}
            />
        </div>
    );
};

export default BlogEditor;
