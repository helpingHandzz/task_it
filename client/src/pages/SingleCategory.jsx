import { getCategoryThunk } from "../store/category";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SubCategoryItem from "../components/SubCategoryItem";

function SingleCategory() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.singleCategory);

  useEffect(() => {
    dispatch(getCategoryThunk(id));
  }, []);
  const background = category.image;
  return (
    <div className="bg-slate-100 pb-3">
      <div
        className=" bg-no-repeat bg-cover bg-center h-96 min-w-screen md:h-[500px] lg:h-[600px] xl:h-[700px] xl:bg-center lg:bg-bottom "
        style={{ backgroundImage: `url(${background})` }}
      >
        <div
          className="w-full h-96 md:h-[500px] lg:h-[600px] xl:h-[700px] flex justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
          {" "}
          <h1 className="self-center font-extrabold text-5xl md:text-7xl text-white">
            {category.categoryName}
          </h1>
        </div>
      </div>
      <div className="lg:flex">
        <div className="lg:w-[70%]">
          {category.Subcategory &&
            category.Subcategory.map((sub) => (
              <SubCategoryItem key={sub.id} sub={sub} />
            ))}
        </div>
        <div className="pb-8 lg:w-[25%]">
          <h2 className="text-center text-xl font-bold pt-7">
            Tasks Made Easy
          </h2>
          <div className="flex flex-col mx-8 justify-center pt-8 md:flex-row lg:flex-col lg:mx-5">
            <div className="text-center md:w-1/3 lg:flex lg:w-full">
              <div>
                <button className="text-white bg-neutral-800 font-bold rounded-full h-8 w-8 pointer-events-none">
                  1
                </button>
              </div>
              <div className="lg:pl-2">
                <h2 className="text-center text-xl py-3 lg:py-0">
                  Select Your Taskee
                </h2>
                <p className="font-light text-center lg:pt-3">
                  Choose your category, describe your task, and pick one of our
                  qualified Taskees
                </p>
              </div>
            </div>
            <div className="text-center pt-7 md:pt-0 md:w-1/3 md:px-3 lg:w-full lg:flex lg:px-0 lg:py-8  xl:py-10 2xl:py-12">
              <div>
                <button className="text-white bg-neutral-800 font-bold rounded-full h-8 w-8 pointer-events-none">
                  2
                </button>
              </div>
              <div className="lg:pl-2 lg:w-full">
                <h2 className="text-xl py-3 lg:py-0">Schedule Your Task</h2>
                <p className="font-light text-center lg:pt-3">
                  You decide when your task gets done
                </p>
              </div>
            </div>
            <div className="text-center pt-7 md:pt-0 md:w-1/3 lg:w-full lg:flex">
              <div>
                <button className="text-white bg-neutral-800 font-bold rounded-full h-8 w-8 pointer-events-none">
                  3
                </button>
              </div>
              <div className="lg:pl-2">
                <h2 className="text-xl py-3 lg:py-0">
                  Pay when it&apos;s done
                </h2>
                <p className="font-light text-center lg:pt-3">
                  Pay through our platform only after the task is completed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCategory;
