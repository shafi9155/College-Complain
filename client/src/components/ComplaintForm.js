import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/complain/complainSlice";
import { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
function ComplaintForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [desc, setDesc] = useState("");
  const [title, settitle] = useState("");
  const [images, setImages] = useState([]);
  const options1 = ["Private", "Public"];
  const options2 = ["Mess", "Hostel", "Academics"];

  const [complain_type, setcomplainType] = useState(options1[0]);

  const [complain_regarding, setcomplainRegard] = useState(options2[0]);

  function handleRemove(e, i) {
    const pic = [...images];
    pic.splice(i, 1);
    console.log(images);
    setImages(pic);
  }

  const uploadImg = (event, index) => {
    const selectedFile = event.target.files[0];
    // const reader = new FileReader();
  
    
      const updatedImages = [...images];
      updatedImages[index] = URL.createObjectURL(selectedFile);
      setImages(updatedImages);

      console.log(images)
  
    // reader.readAsDataURL(selectedFile);
   
  };

  // const uploadImg = (event) => {
  //   const file = event.target.files[0];
  //   setImage(URL.createObjectURL(file));
  // };
  

  function handleAdd(e) {
    const pic = [...images, []];
    setImages(pic);
    e.preventDefault();
  }

  const { data, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.complain
  );

  useEffect(() => {
    // if(isError){
    //   toast.error(message);
    // }
    // if(isSuccess){
    //   toast("Registered Successfully");
    // }
    // if( isSuccess){

    // //  closeSignup();
    //  }
    dispatch(reset());
  }, [data, isError, isSuccess, message, navigate, dispatch]);
  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append('photo', images[i]);
      }

    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("status", "Open");
    formData.append("complain_regarding", complain_regarding);
    formData.append("complain_type", complain_type);

    // for (const [key, value] of formData.entries()) {
    //   if (key === 'photo') {
    //     console.log(value);
    //   }
    // }

    dispatch(register(formData));
    toast("Complaint Registered Successfully");
    navigate("/Userprofile");

  }
  return (
    <div className="">
      <form className="mt-8 text-left" enctype="multipart/form-data">
        <div>
          <label htmlFor="Title">
            <p className="para">Title</p>
            <input
              placeholder="Enter your Complaint"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              type="text"
              className="ipt"
            />
          </label>
        </div>
        <div className=" pb-2">
          <p className="para">Complaint Regarding</p>
          <label htmlFor="select">
            <select
              className="w-full rounded-lg p-3 border-gray-500 border-2 "
              onChange={(e) => setcomplainRegard(e.target.value)}
            >
              {options2.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className=" pb-2">
          <p className="para">Complaint Type</p>
          <label htmlFor="select">
            <select
              className="w-full rounded-lg p-3 border-gray-500 border-2 "
              onChange={(e) => setcomplainType(e.target.value)}
            >
              {options1.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="  mt-5">
          <span className="pr-5">Upload Images</span>
          <button
            className="text-white text-lg  bg-custom-blue w-7 right rounded-full"
            type="button"
            onClick={() => handleAdd()}
          >
            <AddIcon />
          </button> 

           {images.map((data, i) => (
            <div key={i}>
              <label htmlFor="rollno">
                <input
                  onChange={(e) => uploadImg(e, i)}
                  type="file"
                  className="ipt1"
                />
                <button
                  className="mt-3 font-bold text-white bg-custom-blue rounded-full  ml-5 font-mono w-10"
                  onClick={() => handleRemove(i)}
                  type="button"
                >
                  -
                </button>

                <img className="border p-5 w-1/2" src={data} alt="" />
              </label>
            </div>
          ))}
        </div>
        <div>
          <p className="para">Complaint description:</p>

          <label htmlFor="complain">
            <textarea
              placeholder="Enter your Complaint description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="txtarea"
              name="complain"
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </label>
        </div>
        <div className="">
          <label htmlFor="submit">
            <input
              type="submit"
              value="Submit"
              onClick={handleSubmit}
              className="btn text-white"
            />
          </label>
        </div>
      </form>
    </div>
  );
}

export default ComplaintForm;
