import React from 'react';

function DataTable({ openModal, setModalData }: { openModal: () => void, setModalData: (data: any) => void }) {
    const data = [
        {
            date: '2024-08-16',
            url: 'https://example.com',
            description: 'This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.',
            dataPoints: 25,
            status: 'Completed',
            headings: ["Heading 1", "Heading 2", "Heading 3"],
            links: ["https://www.example.com", "https://www.example.com"],
        },
        {
            date: '2024-08-15',
            url: 'https://another-example.com',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            dataPoints: 15,
            status: 'Pending',
            headings: ["Heading 1", "Heading 2", "Heading 3"],
            links: ["https://www.example.com", "https://www.example.com"],
        },
        {
            date: '2024-08-14',
            url: 'https://sample-site.com',
            description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)',
            dataPoints: 30,
            status: 'Failed',
            headings: ["Heading 1", "Heading 2", "Heading 3"],
            links: ["https://www.example.com", "https://www.example.com"],
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                URL
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Data Points
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                    {row.date}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-200 text-sm text-blue-600 hover:underline">
                                    <a href={row.url} target="_blank" rel="noopener noreferrer">
                                        {row.url}
                                    </a>
                                </td>
                                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                    {row.dataPoints}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                    {row.status}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                    <button onClick={() => {
                                        openModal()
                                        setModalData(row)
                                    }}>{'>'}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DataTable;
