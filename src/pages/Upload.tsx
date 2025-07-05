import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import Prediction from './Prediction';

interface FileTemplateProps {
  file: File;
  objectURL: string;
  onDelete: (objectURL: string) => void;
}

const FileTemplate: React.FC<FileTemplateProps> = ({ file, objectURL, onDelete }) => (
  <li className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
    <article
      tabIndex={0}
      className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative shadow-sm"
    >
      <img
        alt="upload preview"
        className="img-preview hidden w-full h-full sticky object-cover rounded-md bg-fixed"
      />
      <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
        <h1 className="flex-1 group-hover:text-blue-800">{file.name}</h1>
        <div className="flex">
          <span className="p-1 text-blue-800">
            <svg
              className="fill-current w-4 h-4 ml-auto pt-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
            </svg>
          </span>
          <p className="p-1 text-xs text-gray-700">
            {file.size > 1024
              ? file.size > 1048576
                ? `${Math.round(file.size / 1048576)}mb`
                : `${Math.round(file.size / 1024)}kb`
              : `${file.size}b`}
          </p>
          <button
            type="button"
            title="Delete File"
            className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md text-gray-800"
            data-target={objectURL}
            onClick={() => onDelete(objectURL)}
          >
            <svg
              className="pointer-events-none fill-current w-4 h-4 ml-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
            </svg>
          </button>
        </div>
      </section>
    </article>
  </li>
);

interface ImageTemplateProps {
  file: File;
  objectURL: string;
  onDelete: (objectURL: string) => void;
}

const ImageTemplate: React.FC<ImageTemplateProps> = ({ file, objectURL, onDelete }) => (
  <li className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
    <article
      tabIndex={0}
      className="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm hover:bg-black/40"
    >
      <img
        alt="upload preview"
        src={objectURL}
        className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
      />
      <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
        <h1 className="flex-1">{file.name}</h1>
        <div className="flex">
          <span className="p-1">
            <svg
              className="fill-current w-4 h-4 ml-auto pt-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
            </svg>
          </span>
          <p className="p-1 text-xs">
            {file.size > 1024
              ? file.size > 1048576
                ? `${Math.round(file.size / 1048576)}mb`
                : `${Math.round(file.size / 1024)}kb`
              : `${file.size}b`}
          </p>
          <button
            title="Delete File"
            className="delete ml-auto focus:outline-none hover:bg-black/45 p-1 rounded-md"
            data-target={objectURL}
            onClick={() => onDelete(objectURL)}
          >
            <svg
              className="pointer-events-none fill-current w-4 h-4 ml-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
            </svg>
          </button>
        </div>
      </section>
    </article>
  </li>
);

const Upload: React.FC = () => {
  const [files, setFiles] = useState<Record<string, File>>({});
  const [predictions, setPredictions] = useState<
    Array<{ filename: string; label: string; confidence: number; objectURL: string | undefined }>
  >([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const galleryRef = useRef<HTMLUListElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const predictionRef = useRef<HTMLDivElement | null>(null);
  const dragCounter = useRef<number>(0);

  const addFile = (file: File): string => {
    const objectURL = URL.createObjectURL(file);
    setFiles((prev) => ({ ...prev, [objectURL]: file }));
    return objectURL;
  };

  const handleDelete = (objectURL: string): void => {
    setFiles((prev) => {
      const newFiles = { ...prev };
      delete newFiles[objectURL];
      return newFiles;
    });
    if (galleryRef.current && galleryRef.current.children.length === 1) {
      galleryRef.current.querySelector('#empty')?.classList.remove('hidden');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    dragCounter.current = 0;
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach((file) => {
      addFile(file);
    });
  };

  const handleDragEnter = (e: React.DragEvent<HTMLElement>): void => {
    e.preventDefault();
    if (e.dataTransfer.types.includes('Files')) {
      dragCounter.current++;
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLElement>): void => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current <= 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>): void => {
    if (e.dataTransfer.types.includes('Files')) {
      e.preventDefault();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      selectedFiles.forEach((file) => {
        addFile(file);
      });
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (Object.keys(files).length === 0) {
      alert('Please select at least one file to upload.');
      return;
    }

    setIsLoading(true);
    setPredictions([]); // Clear previous predictions
    const formData = new FormData();
    Object.values(files).forEach((file) => {
      formData.append('files', file); // Use 'files' to match potential backend expectation
    });

    try {
      const response = await axios.post('http://localhost:8000/predict/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Handle multiple predictions if backend returns an array
      const newPredictions = Object.entries(files).map(([objectURL], index) => {
        const pred = Array.isArray(response.data) ? response.data[index] : response.data;
        return { ...pred, objectURL };
      });
      setPredictions(newPredictions);
      setFiles({}); // Clear files after upload
      if (galleryRef.current) {
        galleryRef.current.querySelector('#empty')?.classList.remove('hidden');
      }
      // Scroll to prediction section
      predictionRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen p-6 text-center relative overflow-hidden flex flex-col items-center justify-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="w-11/12 sm:px-8 md:px-16 sm:py-8">
        <main className="container mx-auto max-w-screen-lg">
          {/* Upload Section */}
          <article
            aria-label="File Upload Modal"
            className="flex flex-col bg-white shadow-xl rounded-md mb-4"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <div
              ref={overlayRef}
              id="overlay"
              className={`w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md transition-all duration-300 ${
                isDragging ? 'bg-white/70' : ''
              }`}
            >
              <i>
                <svg
                  className={`fill-current w-12 h-12 mb-3 text-blue-700 transition-opacity duration-300 ${
                    isDragging ? 'opacity-100' : 'opacity-0'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
                </svg>
              </i>
              <p
                className={`text-lg text-blue-700 transition-opacity duration-300 ${
                  isDragging ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Drop files to upload
              </p>
            </div>

            <section className="p-8 w-full flex flex-col">
              <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                  <span>Drag and drop your</span> <span>files anywhere or</span>
                </p>
                <input
                  title="Hidden Input"
                  id="hidden-input"
                  type="file"
                  multiple
                  className="hidden"
                  ref={hiddenInputRef}
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  className="mt-2 rounded-sm px-3 py-1 bg-gray-500 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                  onClick={() => hiddenInputRef.current?.click()}
                >
                  Upload a file
                </button>
              </header>

              <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                To Upload
              </h1>

              <ul ref={galleryRef} id="gallery" className="flex flex-1 flex-wrap -m-1">
                {Object.keys(files).length === 0 && (
                  <li
                    id="empty"
                    className="h-full w-full text-center flex flex-col items-center justify-center"
                  >
                    <img
                      className="mx-auto w-32"
                      src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                      alt="no data"
                    />
                    <span className="text-sm text-gray-500">No files selected</span>
                  </li>
                )}
                {Object.entries(files).map(([objectURL, file]) => {
                  const isImage = file.type.match('image.*');
                  return isImage ? (
                    <ImageTemplate
                      key={objectURL}
                      file={file}
                      objectURL={objectURL}
                      onDelete={handleDelete}
                    />
                  ) : (
                    <FileTemplate
                      key={objectURL}
                      file={file}
                      objectURL={objectURL}
                      onDelete={handleDelete}
                    />
                  );
                })}
              </ul>
            </section>

            <footer className="flex justify-end px-8 pb-8 pt-4">
              <button
                id="submit"
                type="button"
                className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Upload now'}
              </button>
            </footer>
          </article>

          {/* Prediction Section */}
          <section
            ref={predictionRef}
            className="w-full h-screen bg-white shadow-xl rounded-md p-8 overflow-scroll transition-all duration-300"
            style={{ display: predictions.length > 0 ? 'block' : 'none' }}
          >
            {isLoading && (
              <motion.div
                className="flex justify-center items-center h-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col items-center">
                  <svg
                    className="animate-spin h-10 w-10 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="mt-2 text-gray-900">Processing your files...</span>
                </div>
              </motion.div>
            )}
            {predictions.length > 0 && (
              <div style={{ scrollBehavior: 'smooth' }}>
                <motion.div
                  className="h-full overflow-y-auto"
                >
                  <Prediction predictions={predictions} />
                </motion.div>
              </div>
            )}
          </section>
        </main>
      </div>
    </motion.div>
  );

};

export default Upload;