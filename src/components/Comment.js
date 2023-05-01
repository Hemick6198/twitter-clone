/* eslint-disable @next/next/no-img-element */
import { Menu } from "@headlessui/react";
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React from "react";
import Moment from "react-moment";

function Comment({ id, post, comment }) {
  const { data: session } = useSession();

  return (
    <div className="p-3 flex cursor-pointer border-b border-gray-700">
      <img
        src={comment?.userImg}
        alt=""
        className="h-11 w-11 rounded-full mr-4"
      />
      <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between">
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4 className="font-bold text-[#d9d9d9] text-[15px] sm:text-base inline-block group-hover:underline">
                {comment?.username}
              </h4>
              <span className="ml-1.5 text-sm sm:text-[15px]">
                @{comment?.tag}{" "}
              </span>
            </div>{" "}
            ·{" "}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
            <p className="text-[#d9d9d9] mt-0.5 max-w-lg text-[15px] sm:text-base">
              {comment?.comment}
            </p>
          </div>
          <div className="icon group flex-shrink-0">
            <Menu>
              <Menu.Button onClick={(e) => e.stopPropagation()}>
                {" "}
                <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0] relative" />
              </Menu.Button>
              <Menu.Items
                className={`bg-black text-white text-center float-left flex flex-col pt-8 top-[70px]`}
              >
                <Menu.Item
                  className={`flex justify-start items-center flex-row`}
                >
                  {({ active }) =>
                    session.user.uid === post?.id ? (
                      <a
                        className={`${active && "bg-red-400 text-white"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteDoc(doc(db, "posts", id));
                          router.push("/");
                        }}
                      >
                        <TrashIcon className="h-5 hover:text-red-600 px-2" />
                        Delete Post
                      </a>
                    ) : (
                      <a className={`${active && " text-white"}`}>
                        <XIcon className="h-5 px-2" />
                        Incorrect Account
                      </a>
                    )
                  }
                </Menu.Item>
                <Menu.Item disabled className={`flex justify-center items-center flex-row`}>
                  {({ active }) => (
                    <a className={`${active && "bg-gray-500 text-white"}`}>
                      <span className="opacity-75 px-2">
                      (more coming soon!)
                      </span>
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>

        <div className="text-[#6e767d] flex justify-between w-10/12">
          <div className="icon group">
            <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>

          <div className="flex items-center space-x-1 group">
            <div className="icon group-hover:bg-pink-600/10">
              <HeartIcon className="h-5 group-hover:text-pink-600" />
            </div>
            <span className="group-hover:text-pink-600 text-sm"></span>
          </div>

          <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
