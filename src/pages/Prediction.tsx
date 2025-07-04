import {motion} from "framer-motion";
interface PredictionProps {
  predictions: Array<{ filename: string; label: string; confidence: number; objectURL: string | undefined }>;
}

const Prediction: React.FC<PredictionProps> = ({ predictions }) => {
return (
    <motion.div
    className="mt-6 p-4 bg-gray-100 shadow-xl rounded-md"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    >
    <h2 className="text-3xl font-semibold text-[#43e97b]">Prediction Results</h2>
    <ul className="mt-4 space-y-4">
        {predictions.map((pred, index) => {
        const isVideo = pred.filename.toLowerCase().endsWith(".mp4");
        return (
            <motion.li
            key={index}
            className="flex flex-col p-4 border border-gray-200 rounded-md bg-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            >
            {pred.objectURL && (
                isVideo ? (
                <video controls className="w-full rounded mb-4" src={pred.objectURL}></video>
                ) : (
                <img src={pred.objectURL} alt="Preview" className="w-full rounded mb-4" />
                )
            )}
            <span className="text-sm font-medium text-gray-900">File: {pred.filename}</span>
            <span className="text-2xl mt-5 text-gray-600">
                Prediction:{" "}
                <span className={pred.label === "Fake" ? "text-red-600" : "text-green-600"}>
                {pred.label}
                </span>
            </span>
            </motion.li>
        );
        })}
    </ul>
    </motion.div>
);
};

export default Prediction;