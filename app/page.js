"use client";
import Layout from "@/components/Layout/Layout";
import axios from "axios";
import Link from "next/link";
import Toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import { Modal, Button } from "antd";
import FormComponent from "@/components/Form/Form";

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postData, setPostData] = useState([]);

  const getAllData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/topics`
      );

      if (data.success) {
        setPostData(data.topics);
      } else {
        console.log("error !! while fetch data");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  // Modal functionality
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //handle delete:

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/topics/${id}`
      );

      if (data.success) {
        console.log(data.message);
        Toast.success(data.message);
        getAllData();
      } else {
        console.log(data.message);
        Toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Layout onShowModal={showModal}>
        <div className="">
          {postData &&
            postData.length > 0 &&
            postData.map((d) => {
              return (
                <div
                  key={d._id}
                  className="bg-gray-800 w-4/6 m-4 rounded-xl p-3 mx-auto flex justify-between"
                >
                  <div>
                    <h1 className="text-white text-xl">Title: {d.title}</h1>
                    <p className="text-gray-300">
                      Descreption: {d.desc.substring(0, 40)}...
                    </p>
                  </div>

                  <div className="flex items-start">
                    <Link
                      href={`/EditTopic/${d._id}`}
                      className="text-blue-300 text-3xl "
                    >
                      <HiPencilAlt />
                    </Link>
                    <button
                      className="text-red-400 text-3xl ml-2"
                      onClick={() => handleDelete(d._id)}
                    >
                      <HiOutlineTrash />{" "}
                    </button>
                  </div>
                </div>
              );
            })}

          {/* /============/modal */}
          <div>
            <Modal
              title="Add Topics"
              open={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <FormComponent handleOk={handleOk} getAllData={getAllData} />
            </Modal>
          </div>
        </div>
      </Layout>
    </>
  );
}
