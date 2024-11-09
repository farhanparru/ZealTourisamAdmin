import{ useState } from 'react';
// eslint-disable-next-line no-unused-vars
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { FiImage } from 'react-icons/fi'; // Import your icon

const AddBanner = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (crop) => setCompletedCrop(crop);

  const getCroppedImage = async () => {
    if (!completedCrop || !selectedImage) return;

    const image = new Image();
    image.src = selectedImage;

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    canvas.toBlob((blob) => {
      if (blob) {
        const croppedImageUrl = URL.createObjectURL(blob);
        setCroppedImage(croppedImageUrl);
      }
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
        <FiImage className="text-blue-500" /> {/* Icon with color */}
        Add Banner
      </h1>
      
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Upload Banner Image:</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="block w-full text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
          />
        </div>

        {selectedImage && (
          <div className="mt-4">
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={onCropComplete}
              aspect={16 / 9}
              className="mt-2 border-2 border-gray-300 rounded-lg"
            >
              <img src={selectedImage} alt="Selected" className="rounded-lg" />
            </ReactCrop>
            <button 
              type="button" 
              onClick={getCroppedImage} 
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Crop Image
            </button>
          </div>
        )}

        {croppedImage && (
          <div className="mt-6 text-center">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Cropped Image Preview:</h3>
            <img src={croppedImage} alt="Cropped Preview" className="rounded-lg border-2 border-gray-300 mx-auto"/>
          </div>
        )}

        <button 
          type="submit" 
          className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors mt-6"
        >
          Save Banner
        </button>
      </form>
    </div>
  );
};

export default AddBanner;
