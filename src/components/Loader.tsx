import { motion } from "framer-motion";

function LoadingCircleSpinner() {
return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
    <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
        }}
    />
    <style>
        {`
        .spinner {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 5px solid rgba(255, 255, 255, 0.2);
            border-top-color: #43e97b;
            will-change: transform;
        }
        `}
    </style>
    </div>
);
}

export default LoadingCircleSpinner;
