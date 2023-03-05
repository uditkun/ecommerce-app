import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../components/Context";
import useCustomFireHooks from "../../hooks/useCustomFireHooks";
import usePageAuth from "../../hooks/usePageAuth";

type ProfileInputs = {
  name: string;
  gender: string;
  phone: number[];
  email: string;
  address: string[];
};

const Profile = () => {
  usePageAuth();
  const { user } = useGlobalState();
  const router = useRouter();
  const { updateUserProfile } = useCustomFireHooks();
  const [userInputs, setUserInputs] = useState<any>({
    name: "",
    gender: "",
    address: [],
  });
  const [profileInputs, setProfileInputs] = useState<ProfileInputs>({
    name: "",
    gender: "",
    phone: [],
    email: "",
    address: [],
  });

  const [isEditMode, setIsEditMode] = useState<Boolean>(false);

  useEffect(() => {
    if (user) {
      const { name, gender, phone, email, address } = user;
      const userData = { name, gender, phone, email, address };

      setProfileInputs(userData);
    } else {
      router.push("/login");
      return;
    }
  }, [user, isEditMode, router]);

  const onProfileSubmit = () => {
    const updateProfileObject: any = {};
    const enteredUserDetails = Object.keys(userInputs).filter((item) => {
      if (
        typeof userInputs[item] === "string" ||
        typeof userInputs[item] === "number"
      ) {
        return userInputs[item];
      }
      if (typeof userInputs[item] === "object") {
        return userInputs[item].length;
      }
    });
    enteredUserDetails &&
      enteredUserDetails.forEach((item) => {
        updateProfileObject[item] = userInputs[item];
      });
    if (Object.keys(updateProfileObject).length) {
      updateUserProfile(updateProfileObject);
      alert("Data updated");
    } else {
      alert("Oops! an error occured. Please retry");
    }
  };

  return (
    <div className="max-w-lg rounded mx-auto">
      <h2 className="text-xl font-bold my-4 text-center">Profile</h2>
      {/* <Image
        src="/defaultValue.png"
        fill={true}
        className="w-full rounded-[50%] object-cover cursor-pointer"
        alt="profileImg"
      /> */}
      {user && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <ul className="flex flex-col gap-4 my-8 w-fit mx-auto">
            <li className="w-100 flex gap-4 items-center">
              <span className="w-20">Name</span>
              {isEditMode ? (
                <input
                  className="rounded"
                  type="text"
                  placeholder="Name"
                  defaultValue={profileInputs.name ? profileInputs.name : ""}
                  onChange={(e) => {
                    setUserInputs({ ...userInputs, name: e.target.value });
                  }}
                  required
                />
              ) : (
                <span>{profileInputs.name}</span>
              )}
            </li>
            <li className="w-100 flex gap-4 items-center">
              <span className="w-20">Gender</span>
              {isEditMode ? (
                <select
                  className="rounded"
                  placeholder="Gender"
                  defaultValue={
                    profileInputs.gender ? profileInputs.gender : ""
                  }
                  onChange={(e) => {
                    setUserInputs({ ...userInputs, gender: e.target.value });
                  }}
                  required
                >
                  <option value="F">Female(F)</option>
                  <option value="F">Transgender(Tr)</option>
                  <option value="M">Male(M)</option>
                  <option value="O">Other</option>
                </select>
              ) : (
                <span>{profileInputs.gender ? profileInputs.gender : "-"}</span>
              )}
            </li>
            {/* <li className="w-100 flex gap-4 items-center">
              <span className="w-20">Phone 1</span>
              {isEditMode ? (
                <input
                  className="rounded"
                  placeholder="Phone 1"
                  type="tel"
                  defaultValue={
                    profileInputs.phone[0] ? profileInputs.phone[0] : ""
                  }
                  onChange={(e) => {
                    setUserInputs({
                      ...userInputs,
                      phone1: Number(e.target.value),
                    });
                  }}
                  required
                />
              ) : (
                <span>
                  {profileInputs.phone[0] ? profileInputs.phone[0] : "-"}
                </span>
              )}
            </li>
            <li className="w-100 flex gap-4 items-center">
              <span className="w-20">Phone 2</span>
              {isEditMode ? (
                <input
                  className="rounded"
                  placeholder="Phone 2"
                  type="tel"
                  defaultValue={
                    profileInputs.phone[1] ? profileInputs.phone[1] : ""
                  }
                  onChange={(e) => {
                    setUserInputs({
                      ...userInputs,
                      phone2: Number(e.target.value),
                    });
                  }}
                  required
                />
              ) : (
                <span>
                  {profileInputs.phone[1] ? profileInputs.phone[1] : "-"}
                </span>
              )}
            </li> */}
            {/* <li className="w-100 flex gap-4 items-center">
              <span className="w-20">Email</span>
              {isEditMode ? (
                <input
                  className="rounded"
                  type="email"
                  placeholder="Email"
                  defaultValue={profileInputs.email ? profileInputs.email : ""}
                  onChange={(e) => {
                    setUserInputs({ ...userInputs, email: e.target.value });
                  }}
                  required
                />
              ) : (
                <span>{profileInputs.email ? profileInputs.email : "-"}</span>
              )}
            </li> */}
            <li className="w-100 flex gap-4 items-center">
              <span className="w-20">Address</span>
              {isEditMode ? (
                <input
                  className="rounded"
                  type="text"
                  placeholder="Address"
                  defaultValue={
                    profileInputs.address[0] ? profileInputs.address[0] : ""
                  }
                  onChange={(e) => {
                    setUserInputs({
                      ...userInputs,
                      address: [String(e.target.value)],
                    });
                  }}
                  required
                />
              ) : (
                <span>
                  {profileInputs.address[0] ? profileInputs.address : "-"}
                </span>
              )}
            </li>
          </ul>
          <div className="flex gap-4 justify-center items-center">
            <button
              className="rounded-sm bg-slate-600 py-1 px-4 text-white"
              type="button"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {isEditMode ? "Go back" : "Edit"}
            </button>
            {isEditMode ? (
              <button
                className="rounded-sm bg-slate-600 py-1 px-4 text-white"
                type="submit"
                onClick={onProfileSubmit}
              >
                Submit
              </button>
            ) : (
              <></>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
