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
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { db } from "../firebase";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../../atoms/modalAtom";

function Comment({ id, post, comment, postPage }) {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const { data: session } = useSession();
  const [likes, setlikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [id]
  );

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } 
    // else {
    //   await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
    //     username: session.user.name,
    //   });
    // }
  };

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
                <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
              </Menu.Button>
              <Menu.Items
                className={`bg-black float-left text-white absolute flex flex-col pt-8 z-50 items-center justify-center`}
              >
                <Menu.Item
                  className={`flex justify-start items-center flex-row px-5`}
                >
                  {({ active }) =>
                    session.user.tag === comment?.tag ? (
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
                      <a className={`${active && "bg-gray-600 text-white"}`}>
                        <XIcon className="h-5 px-2" />
                        Wrong Account to Delete
                      </a>
                    )
                  }
                </Menu.Item>
                <Menu.Item
                  disabled
                  className={`flex justify-center items-center flex-row px-5`}
                >
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
        {postPage && (
          <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
            {post?.text}
          </p>
        )}
        <img
          src={post?.image}
          alt=""
          className="rounded-2xl max-h-[500px] object-cover mr-2"
        />
        <div
          className={`text-[$6e767d] flex justify-between w-10/12 ${
            postPage && "mx-auto"
          }`}
        >
          <div
            className="flex items-center space-x-1 group"
            // onClick={(e) => {
            //   e.stopPropagation();
            //   setPostId(id);
            //   setIsOpen(true);
            // }}
          >
            <div className="icon group group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {comments.length > 0 && (
              <span className="group-hover:text-[#1d9bf0] text-sm">
                {comments.length}
              </span>
            )}
          </div>

          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            <div className="icon group-hover:bg-pink-600/10">
              {liked ? (
                <HeartIconFilled className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {likes.length > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${
                  liked && "text-pink-600"
                }`}
              >
                {likes.length}
              </span>
            )}
          </div>
          <span className="group-hover:text-pink-600 text-sm"></span>
          <div className="icon group text-[#6e767d]">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group text-[#6e767d]">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Comment;
