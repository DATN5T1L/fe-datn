"use client";

import {
  ArrowClockwise,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  CloudUpload,
  TypeBold,
} from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import mod from "../../marketing.module.css";
import postMod from "./post.module.css";

const AddMarketingPost = () => {
  return (
    <div
      className={`${postMod.postContainer} d-flex flex-column gap-4 m-4 m-xs-2 m-sm-3 p-4 bg-white`}
    >
      <div
        className={`${postMod.dragAndDrop} border-dark-subtle d-flex flex-column gap-2 w-100 justify-content-center align-items-center`}
      >
        <div className="mb-4">
          <svg
            width="47"
            height="39"
            viewBox="0 0 47 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M31.5 27.5L23.5 19.5L15.5 27.5"
              stroke="#4D4D4D"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M23.5 19.5V37.5"
              stroke="#4D4D4D"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M40.2789 32.28C42.2296 31.2165 43.7706 29.5337 44.6587 27.4972C45.5468 25.4607 45.7314 23.1864 45.1834 21.0334C44.6353 18.8803 43.3859 16.971 41.6323 15.6069C39.8786 14.2427 37.7207 13.5014 35.4989 13.5H32.9789C32.3736 11.1585 31.2453 8.98464 29.6788 7.14195C28.1124 5.29927 26.1486 3.83567 23.9351 2.86118C21.7216 1.8867 19.316 1.42669 16.8992 1.51573C14.4823 1.60478 12.1171 2.24057 9.9813 3.3753C7.84552 4.51003 5.99477 6.11417 4.56819 8.06713C3.14161 10.0201 2.17632 12.271 1.7449 14.6508C1.31348 17.0305 1.42715 19.477 2.07737 21.8065C2.72759 24.136 3.89743 26.2877 5.49894 28.1"
              stroke="#4D4D4D"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M31.5 27.5L23.5 19.5L15.5 27.5"
              stroke="#4D4D4D"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <small className="fw-semibold">Chọn một hình ảnh</small>
        <span className="text-muted">
          JPG, PNG or PDF, Kích thức file không lớn hơn 10MB
        </span>
        <Button
          variant="outline-primary"
          className={`${mod.btnCTA} ${mod.btnCTAOutline} m-3 p-3`}
        >
          <small>Thêm ảnh bài viết</small>
        </Button>
      </div>
      <Form>
        <Form.Group>
          <Form.Label>Tên tiêu đề</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập vào tiêu đề nội dung"
            className={`${postMod.form} text-muted py-2`}
          />
        </Form.Group>
      </Form>
      <Form>
        <Form.Group>
          <div className="d-flex flex-wrap border gap-2 p-2 rounded-top">
            <svg
              width="68"
              height="24"
              viewBox="0 0 68 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 12.5H4M4 12.5L10 6.5M4 12.5L10 18.5"
                stroke="#4D4D4D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M48 12.5H64M64 12.5L58 6.5M64 12.5L58 18.5"
                stroke="#4D4D4D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div className={`${postMod.seperator}`} />
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.364 3.55762C18.7782 3.55762 19.114 3.8934 19.114 4.30762V8.55026C19.114 8.96447 18.7782 9.30026 18.364 9.30026H14.1213C13.7071 9.30026 13.3713 8.96447 13.3713 8.55026C13.3713 8.13604 13.7071 7.80026 14.1213 7.80026H16.4817C13.6363 5.55718 9.4987 5.74825 6.87348 8.37348C4.04217 11.2048 4.04217 15.7952 6.87348 18.6265C9.70478 21.4578 14.2952 21.4578 17.1265 18.6265C19.0234 16.7297 19.6504 14.0428 19.0039 11.6219C18.897 11.2217 19.1348 10.8106 19.535 10.7038C19.9352 10.5969 20.3462 10.8347 20.4531 11.2349C21.2321 14.1518 20.478 17.3964 18.1872 19.6872C14.7701 23.1043 9.2299 23.1043 5.81282 19.6872C2.39573 16.2701 2.39573 10.7299 5.81282 7.31282C9.04483 4.0808 14.1762 3.90576 17.614 6.78768V4.30762C17.614 3.8934 17.9497 3.55762 18.364 3.55762Z"
                fill="#4D4D4D"
              />
            </svg>
            <div className={`${postMod.seperator}`} />
            <svg
              width="114"
              height="24"
              viewBox="0 0 114 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.12 17.5V7.14H2.492V11.634H7.434V7.14H8.806V17.5H7.434V12.866H2.492V17.5H1.12ZM14.2798 17.64C13.6731 17.64 13.1458 17.5327 12.6978 17.318C12.2591 17.094 11.8951 16.7953 11.6058 16.422C11.3258 16.0487 11.1158 15.638 10.9758 15.19C10.8358 14.7327 10.7658 14.266 10.7658 13.79C10.7658 13.3233 10.8311 12.8613 10.9618 12.404C11.1018 11.9467 11.3118 11.5313 11.5918 11.158C11.8811 10.7847 12.2404 10.4907 12.6698 10.276C13.1084 10.052 13.6264 9.94 14.2238 9.94C14.8584 9.94 15.4184 10.0847 15.9038 10.374C16.3891 10.6633 16.7718 11.0927 17.0518 11.662C17.3318 12.2313 17.4718 12.9453 17.4718 13.804V14.196H12.1098C12.1378 14.616 12.2358 15.0033 12.4038 15.358C12.5811 15.7033 12.8284 15.9833 13.1458 16.198C13.4631 16.4033 13.8411 16.506 14.2798 16.506C14.6624 16.506 14.9704 16.4453 15.2038 16.324C15.4464 16.1933 15.6378 16.044 15.7778 15.876C15.9178 15.708 16.0111 15.5633 16.0578 15.442C16.1138 15.3113 16.1418 15.246 16.1418 15.246H17.3878C17.3878 15.246 17.3644 15.33 17.3178 15.498C17.2711 15.6567 17.1871 15.8527 17.0658 16.086C16.9444 16.3193 16.7671 16.5573 16.5338 16.8C16.3004 17.0333 16.0018 17.234 15.6378 17.402C15.2738 17.5607 14.8211 17.64 14.2798 17.64ZM12.1238 13.16H16.1698C16.1511 12.6747 16.0484 12.2827 15.8618 11.984C15.6751 11.676 15.4371 11.4473 15.1478 11.298C14.8584 11.1487 14.5504 11.074 14.2238 11.074C13.6358 11.074 13.1551 11.2653 12.7818 11.648C12.4084 12.0213 12.1891 12.5253 12.1238 13.16ZM22.4383 9.94C22.9049 9.94 23.2969 10.0147 23.6143 10.164C23.9316 10.3133 24.1883 10.4907 24.3843 10.696C24.5803 10.892 24.7296 11.0787 24.8323 11.256H24.9163V10.08H26.2463V17.5H24.9163V16.324H24.8323C24.7296 16.5013 24.5803 16.6927 24.3843 16.898C24.1883 17.1033 23.9316 17.2807 23.6143 17.43C23.2969 17.57 22.9049 17.64 22.4383 17.64C21.8783 17.64 21.3883 17.5327 20.9683 17.318C20.5483 17.094 20.1983 16.8 19.9183 16.436C19.6383 16.0627 19.4283 15.6473 19.2883 15.19C19.1483 14.7327 19.0783 14.266 19.0783 13.79C19.0783 13.314 19.1483 12.8473 19.2883 12.39C19.4283 11.9327 19.6383 11.522 19.9183 11.158C20.1983 10.7847 20.5483 10.4907 20.9683 10.276C21.3883 10.052 21.8783 9.94 22.4383 9.94ZM22.6623 11.074C22.1676 11.074 21.7523 11.2093 21.4163 11.48C21.0803 11.7413 20.8283 12.0773 20.6603 12.488C20.5016 12.8987 20.4223 13.3327 20.4223 13.79C20.4223 14.238 20.5016 14.672 20.6603 15.092C20.8283 15.5027 21.0803 15.8433 21.4163 16.114C21.7523 16.3753 22.1676 16.506 22.6623 16.506C23.1569 16.506 23.5676 16.3753 23.8943 16.114C24.2303 15.8433 24.4776 15.5027 24.6363 15.092C24.8043 14.672 24.8883 14.238 24.8883 13.79C24.8883 13.3327 24.8043 12.8987 24.6363 12.488C24.4776 12.0773 24.2303 11.7413 23.8943 11.48C23.5676 11.2093 23.1569 11.074 22.6623 11.074ZM31.4207 17.64C30.8607 17.64 30.3707 17.5327 29.9507 17.318C29.5307 17.094 29.1807 16.8 28.9007 16.436C28.6207 16.0627 28.4107 15.6473 28.2707 15.19C28.1307 14.7327 28.0607 14.266 28.0607 13.79C28.0607 13.314 28.1307 12.8473 28.2707 12.39C28.4107 11.9327 28.6207 11.522 28.9007 11.158C29.1807 10.7847 29.5307 10.4907 29.9507 10.276C30.3707 10.052 30.8607 9.94 31.4207 9.94C31.8874 9.94 32.2794 10.0147 32.5967 10.164C32.914 10.3133 33.1707 10.4907 33.3667 10.696C33.5627 10.892 33.712 11.0787 33.8147 11.256H33.8987V6.86H35.2287V17.5H33.8987V16.324H33.8147C33.712 16.5013 33.5627 16.6927 33.3667 16.898C33.1707 17.1033 32.914 17.2807 32.5967 17.43C32.2794 17.57 31.8874 17.64 31.4207 17.64ZM31.6447 16.506C32.1394 16.506 32.55 16.3753 32.8767 16.114C33.2127 15.8433 33.46 15.5027 33.6187 15.092C33.7867 14.672 33.8707 14.238 33.8707 13.79C33.8707 13.3327 33.7867 12.8987 33.6187 12.488C33.46 12.0773 33.2127 11.7413 32.8767 11.48C32.55 11.2093 32.1394 11.074 31.6447 11.074C31.15 11.074 30.7347 11.2093 30.3987 11.48C30.0627 11.7413 29.8107 12.0773 29.6427 12.488C29.484 12.8987 29.4047 13.3327 29.4047 13.79C29.4047 14.238 29.484 14.672 29.6427 15.092C29.8107 15.5027 30.0627 15.8433 30.3987 16.114C30.7347 16.3753 31.15 16.506 31.6447 16.506ZM38.2015 8.666C37.9495 8.666 37.7395 8.582 37.5715 8.414C37.4128 8.246 37.3335 8.04533 37.3335 7.812C37.3335 7.56933 37.4128 7.364 37.5715 7.196C37.7395 7.028 37.9495 6.944 38.2015 6.944C38.4442 6.944 38.6495 7.028 38.8175 7.196C38.9855 7.364 39.0695 7.56933 39.0695 7.812C39.0695 8.04533 38.9855 8.246 38.8175 8.414C38.6495 8.582 38.4442 8.666 38.2015 8.666ZM37.5435 17.5V10.08H38.8735V17.5H37.5435ZM41.0249 17.5V10.08H42.3549V11.158H42.4389C42.5043 11.046 42.6116 10.892 42.7609 10.696C42.9196 10.5 43.1436 10.3273 43.4329 10.178C43.7223 10.0193 44.0863 9.94 44.5249 9.94C45.0663 9.94 45.5283 10.066 45.9109 10.318C46.2936 10.5607 46.5829 10.892 46.7789 11.312C46.9843 11.732 47.0869 12.2033 47.0869 12.726V17.5H45.7569V12.81C45.7569 12.3153 45.6169 11.9047 45.3369 11.578C45.0663 11.2513 44.6696 11.088 44.1469 11.088C43.7269 11.088 43.3863 11.1953 43.1249 11.41C42.8636 11.6153 42.6676 11.8907 42.5369 12.236C42.4156 12.572 42.3549 12.9313 42.3549 13.314V17.5H41.0249ZM52.6203 20.44C52.0043 20.44 51.491 20.356 51.0803 20.188C50.6696 20.0293 50.3383 19.824 50.0863 19.572C49.8436 19.3293 49.6616 19.0867 49.5403 18.844C49.419 18.6013 49.3396 18.396 49.3023 18.228C49.265 18.0693 49.2463 17.99 49.2463 17.99H50.5763C50.5763 17.99 50.5996 18.0553 50.6463 18.186C50.693 18.3167 50.7816 18.466 50.9123 18.634C51.0523 18.802 51.2576 18.9513 51.5283 19.082C51.799 19.2127 52.163 19.278 52.6203 19.278C53.1616 19.278 53.5863 19.1707 53.8943 18.956C54.2023 18.7507 54.4216 18.48 54.5523 18.144C54.6923 17.808 54.7623 17.4533 54.7623 17.08V16.226H54.6923C54.599 16.3847 54.4496 16.5667 54.2443 16.772C54.0483 16.968 53.787 17.1407 53.4603 17.29C53.1336 17.43 52.7323 17.5 52.2563 17.5C51.6963 17.5 51.2063 17.3927 50.7863 17.178C50.3663 16.9633 50.0163 16.674 49.7363 16.31C49.4656 15.946 49.2603 15.54 49.1203 15.092C48.9803 14.644 48.9103 14.1867 48.9103 13.72C48.9103 13.2533 48.9803 12.796 49.1203 12.348C49.2603 11.9 49.4656 11.494 49.7363 11.13C50.0163 10.766 50.3663 10.4767 50.7863 10.262C51.2063 10.0473 51.6963 9.94 52.2563 9.94C52.7323 9.94 53.1336 10.0147 53.4603 10.164C53.787 10.304 54.0483 10.472 54.2443 10.668C54.4496 10.864 54.599 11.046 54.6923 11.214H54.7623V10.08H56.0923V17.066C56.0923 18.102 55.789 18.9233 55.1823 19.53C54.585 20.1367 53.731 20.44 52.6203 20.44ZM52.5083 16.366C53.003 16.366 53.4136 16.24 53.7403 15.988C54.0763 15.7267 54.3236 15.3953 54.4823 14.994C54.6503 14.5927 54.7343 14.168 54.7343 13.72C54.7343 13.272 54.6503 12.8473 54.4823 12.446C54.3236 12.0353 54.0763 11.704 53.7403 11.452C53.4136 11.2 53.003 11.074 52.5083 11.074C52.0136 11.074 51.5983 11.2 51.2623 11.452C50.9263 11.704 50.6743 12.0353 50.5063 12.446C50.3476 12.8473 50.2683 13.272 50.2683 13.72C50.2683 14.168 50.3476 14.5927 50.5063 14.994C50.6743 15.3953 50.9263 15.7267 51.2623 15.988C51.5983 16.24 52.0136 16.366 52.5083 16.366ZM61.427 17.5V16.534L63.695 14.434C64.3296 13.846 64.885 13.3327 65.361 12.894C65.8463 12.446 66.2243 12.012 66.495 11.592C66.7656 11.172 66.901 10.71 66.901 10.206C66.901 9.786 66.7983 9.43133 66.593 9.142C66.397 8.85267 66.1403 8.63333 65.823 8.484C65.515 8.32533 65.193 8.246 64.857 8.246C64.4183 8.246 64.059 8.32067 63.779 8.47C63.499 8.61933 63.2843 8.806 63.135 9.03C62.9856 9.24467 62.8783 9.464 62.813 9.688C62.7476 9.90267 62.7103 10.0847 62.701 10.234C62.6916 10.3833 62.687 10.458 62.687 10.458H61.371C61.371 10.458 61.3756 10.374 61.385 10.206C61.3943 10.038 61.427 9.82333 61.483 9.562C61.5483 9.30067 61.651 9.02533 61.791 8.736C61.931 8.43733 62.127 8.15733 62.379 7.896C62.6403 7.63467 62.9716 7.42 63.373 7.252C63.7836 7.084 64.283 7 64.871 7C65.4683 7 66.0236 7.126 66.537 7.378C67.0596 7.62067 67.4796 7.98 67.797 8.456C68.1143 8.92267 68.273 9.49667 68.273 10.178C68.273 10.8033 68.1143 11.3727 67.797 11.886C67.489 12.39 67.0783 12.8847 66.565 13.37C66.0516 13.8553 65.4916 14.378 64.885 14.938L63.457 16.254H68.497V17.5H61.427Z"
                fill="#666666"
              />
              <path
                d="M109 9.5L102 15.5L95 9.5"
                stroke="#4D4D4D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div className={`${postMod.seperator}`} />
            <svg
              width="152"
              height="23"
              viewBox="0 0 152 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.6087 1.5C5.61567 1.5 4 3.11567 4 5.1087V20.4412C4 22.1305 5.36948 23.5 7.05882 23.5H14C17.3137 23.5 20 20.8137 20 17.5C20 14.9259 18.3791 12.7304 16.1022 11.8786C17.2702 10.7839 18 9.22715 18 7.5C18 4.18629 15.3137 1.5 12 1.5H7.6087ZM12 11.5C14.2091 11.5 16 9.70914 16 7.5C16 5.29086 14.2091 3.5 12 3.5H7.6087C6.72024 3.5 6 4.22024 6 5.1087V11.5H12ZM6 13.5V20.4412C6 21.0259 6.47405 21.5 7.05882 21.5H14C16.2091 21.5 18 19.7091 18 17.5C18 15.2909 16.2091 13.5 14 13.5H6Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M58.9768 1.50026H53C52.4477 1.50026 52 1.94798 52 2.50026C52 3.05255 52.4477 3.50026 53 3.50026H57.656L52.256 21.5003H47C46.4477 21.5003 46 21.948 46 22.5003C46 23.0525 46.4477 23.5003 47 23.5003H52.9775C52.9928 23.5006 53.0081 23.5006 53.0232 23.5003H59C59.5523 23.5003 60 23.0525 60 22.5003C60 21.948 59.5523 21.5003 59 21.5003H54.344L59.744 3.50026H65C65.5523 3.50026 66 3.05255 66 2.50026C66 1.94798 65.5523 1.50026 65 1.50026H59.0225C59.0072 1.49991 58.992 1.49991 58.9768 1.50026Z"
                fill="#4D4D4D"
              />
              <path
                d="M93 3.5C93 2.94772 92.5523 2.5 92 2.5C91.4477 2.5 91 2.94772 91 3.5V9.5C91 14.4706 95.0294 18.5 100 18.5C104.971 18.5 109 14.4706 109 9.5V3.5C109 2.94772 108.552 2.5 108 2.5C107.448 2.5 107 2.94772 107 3.5V9.5C107 13.366 103.866 16.5 100 16.5C96.134 16.5 93 13.366 93 9.5V3.5Z"
                fill="#4D4D4D"
              />
              <path
                d="M92 20.5C91.4477 20.5 91 20.9477 91 21.5C91 22.0523 91.4477 22.5 92 22.5H108C108.552 22.5 109 22.0523 109 21.5C109 20.9477 108.552 20.5 108 20.5H92Z"
                fill="#4D4D4D"
              />
              <path
                d="M139.4 17.1L134.8 12.5L139.4 7.9L138 6.5L132 12.5L138 18.5L139.4 17.1ZM144.6 17.1L149.2 12.5L144.6 7.9L146 6.5L152 12.5L146 18.5L144.6 17.1Z"
                fill="black"
              />
            </svg>
            <div className={`${postMod.seperator}`} />
            <svg
              width="255"
              height="25"
              viewBox="0 0 255 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 21V18.843C12.863 17.651 14.5 14.968 14.5 11.884C14.5 8.811 12.5 5.855 9 5.855C5.5 5.855 3.5 8.811 3.5 11.885C3.5 14.968 5.137 17.651 7 18.843V21H0V19H4.76C2.666 17.505 1 14.989 1 11.884C1 7.247 4.5 4 9 4C13.5 4 17 7.247 17 11.884C17 14.989 15.334 17.505 13.24 19H18V21H11Z"
                fill="black"
              />
              <path
                d="M57.7388 4.76118C55.0572 2.07961 50.7095 2.07961 48.0279 4.76118L47.3071 5.48203C47.0142 5.77492 47.0142 6.2498 47.3071 6.54269C47.6 6.83558 48.0748 6.83558 48.3677 6.54269L49.0886 5.82184C51.1844 3.72605 54.5823 3.72605 56.6781 5.82184C58.7739 7.91763 58.7739 11.3156 56.6781 13.4114L55.9573 14.1322C55.6644 14.4251 55.6644 14.9 55.9573 15.1929C56.2502 15.4858 56.725 15.4858 57.0179 15.1929L57.7388 14.472C60.4203 11.7905 60.4203 7.44276 57.7388 4.76118Z"
                fill="#4D4D4D"
              />
              <path
                d="M44.0427 9.80707C44.3356 10.1 44.3356 10.5748 44.0427 10.8677L43.3218 11.5886C41.2261 13.6844 41.2261 17.0823 43.3218 19.1781C45.4176 21.2739 48.8156 21.2739 50.9114 19.1781L51.6322 18.4573C51.9251 18.1644 52.4 18.1644 52.6929 18.4573C52.9858 18.7501 52.9858 19.225 52.6929 19.5179L51.972 20.2388C49.2905 22.9203 44.9428 22.9203 42.2612 20.2388C39.5796 17.5572 39.5796 13.2095 42.2612 10.5279L42.982 9.80707C43.2749 9.51418 43.7498 9.51418 44.0427 9.80707Z"
                fill="#4D4D4D"
              />
              <path
                d="M52.6928 9.80707C52.9857 10.1 52.9857 10.5748 52.6928 10.8677L48.3677 15.1928C48.0748 15.4857 47.6 15.4857 47.3071 15.1928C47.0142 14.8999 47.0142 14.4251 47.3071 14.1322L51.6322 9.80707C51.9251 9.51418 52.3999 9.51418 52.6928 9.80707Z"
                fill="#4D4D4D"
              />
              <path
                d="M82 6.5C82 5.96957 82.2107 5.46086 82.5858 5.08579C82.9609 4.71071 83.4696 4.5 84 4.5H96C96.5304 4.5 97.0391 4.71071 97.4142 5.08579C97.7893 5.46086 98 5.96957 98 6.5V18.5C98 19.0304 97.7893 19.5391 97.4142 19.9142C97.0391 20.2893 96.5304 20.5 96 20.5H84C83.4696 20.5 82.9609 20.2893 82.5858 19.9142C82.2107 19.5391 82 19.0304 82 18.5V6.5ZM97 8.5H93V11.5H97V8.5ZM97 12.5H93V15.5H97V12.5ZM97 16.5H93V19.5H96C96.2652 19.5 96.5196 19.3946 96.7071 19.2071C96.8946 19.0196 97 18.7652 97 18.5V16.5ZM92 19.5V16.5H88V19.5H92ZM87 19.5V16.5H83V18.5C83 18.7652 83.1054 19.0196 83.2929 19.2071C83.4804 19.3946 83.7348 19.5 84 19.5H87ZM83 15.5H87V12.5H83V15.5ZM83 11.5H87V8.5H83V11.5ZM88 8.5V11.5H92V8.5H88ZM92 12.5H88V15.5H92V12.5Z"
                fill="black"
              />
              <path
                d="M106.915 11.25L103.999 13.75L101.082 11.25"
                stroke="#4D4D4D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M132.25 22.5C132.25 22.0858 132.586 21.75 133 21.75H149C149.414 21.75 149.75 22.0858 149.75 22.5C149.75 22.9142 149.414 23.25 149 23.25H133C132.586 23.25 132.25 22.9142 132.25 22.5Z"
                fill="#134588"
              />
              <path
                d="M140.52 15.429L140.52 15.4289L146.437 9.51225C145.632 9.1771 144.678 8.62656 143.776 7.72455C142.874 6.82238 142.323 5.86846 141.988 5.06312L136.071 10.9799L136.071 10.98C135.609 11.4417 135.378 11.6725 135.18 11.9271C134.946 12.2273 134.745 12.5522 134.581 12.896C134.442 13.1874 134.339 13.4972 134.132 14.1167L133.044 17.3833C132.942 17.6882 133.021 18.0243 133.249 18.2515C133.476 18.4787 133.812 18.5581 134.117 18.4564L137.383 17.3676C138.003 17.1611 138.313 17.0578 138.604 16.9189C138.948 16.7551 139.273 16.5543 139.573 16.3201C139.827 16.1215 140.058 15.8907 140.52 15.429Z"
                fill="#F9E959"
              />
              <path
                d="M148.079 7.87044C149.307 6.64188 149.307 4.64999 148.079 3.42142C146.85 2.19286 144.858 2.19286 143.63 3.42142L142.92 4.13105C142.93 4.1604 142.94 4.19015 142.95 4.22028C143.21 4.97 143.701 5.95281 144.624 6.87602C145.547 7.79923 146.53 8.28999 147.28 8.55009C147.31 8.5605 147.34 8.57054 147.369 8.58021L148.079 7.87044Z"
                fill="#F9E959"
              />
              <path
                d="M160.833 11.25L157.917 13.75L155 11.25"
                stroke="#4D4D4D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M199.207 12.5V9.5C199.207 9.35087 199.148 9.20789 199.042 9.1025L193.792 3.8525C193.687 3.74698 193.544 3.68763 193.395 3.6875H184.395C184.046 3.6875 183.713 3.82578 183.466 4.07192C183.22 4.31806 183.082 4.6519 183.082 5V12.5C183.082 12.6492 183.141 12.7923 183.247 12.8977C183.352 13.0032 183.495 13.0625 183.645 13.0625C183.794 13.0625 183.937 13.0032 184.042 12.8977C184.148 12.7923 184.207 12.6492 184.207 12.5V5C184.207 4.95027 184.227 4.90258 184.262 4.86742C184.297 4.83225 184.345 4.8125 184.395 4.8125H192.832V9.5C192.832 9.64918 192.891 9.79226 192.997 9.89775C193.102 10.0032 193.245 10.0625 193.395 10.0625H198.082V12.5C198.082 12.6492 198.141 12.7923 198.247 12.8977C198.352 13.0032 198.495 13.0625 198.645 13.0625C198.794 13.0625 198.937 13.0032 199.042 12.8977C199.148 12.7923 199.207 12.6492 199.207 12.5ZM193.957 5.6075L197.287 8.9375H193.957V5.6075ZM185.332 16.25V20.75C185.332 20.8992 185.273 21.0423 185.167 21.1477C185.062 21.2532 184.919 21.3125 184.77 21.3125C184.62 21.3125 184.477 21.2532 184.372 21.1477C184.266 21.0423 184.207 20.8992 184.207 20.75V19.0625H181.957V20.75C181.957 20.8992 181.898 21.0423 181.792 21.1477C181.687 21.2532 181.544 21.3125 181.395 21.3125C181.245 21.3125 181.102 21.2532 180.997 21.1477C180.891 21.0423 180.832 20.8992 180.832 20.75V16.25C180.832 16.1008 180.891 15.9577 180.997 15.8523C181.102 15.7468 181.245 15.6875 181.395 15.6875C181.544 15.6875 181.687 15.7468 181.792 15.8523C181.898 15.9577 181.957 16.1008 181.957 16.25V17.9375H184.207V16.25C184.207 16.1008 184.266 15.9577 184.372 15.8523C184.477 15.7468 184.62 15.6875 184.77 15.6875C184.919 15.6875 185.062 15.7468 185.167 15.8523C185.273 15.9577 185.332 16.1008 185.332 16.25ZM190.582 16.25C190.582 16.3992 190.523 16.5423 190.417 16.6477C190.312 16.7532 190.169 16.8125 190.02 16.8125H189.082V20.75C189.082 20.8992 189.023 21.0423 188.917 21.1477C188.812 21.2532 188.669 21.3125 188.52 21.3125C188.37 21.3125 188.227 21.2532 188.122 21.1477C188.016 21.0423 187.957 20.8992 187.957 20.75V16.8125H187.02C186.87 16.8125 186.727 16.7532 186.622 16.6477C186.516 16.5423 186.457 16.3992 186.457 16.25C186.457 16.1008 186.516 15.9577 186.622 15.8523C186.727 15.7468 186.87 15.6875 187.02 15.6875H190.02C190.169 15.6875 190.312 15.7468 190.417 15.8523C190.523 15.9577 190.582 16.1008 190.582 16.25ZM197.332 16.25V20.75C197.332 20.8992 197.273 21.0423 197.167 21.1477C197.062 21.2532 196.919 21.3125 196.77 21.3125C196.62 21.3125 196.477 21.2532 196.372 21.1477C196.266 21.0423 196.207 20.8992 196.207 20.75V17.9375L194.97 19.5875C194.917 19.6574 194.849 19.7141 194.771 19.7531C194.693 19.7922 194.607 19.8125 194.52 19.8125C194.432 19.8125 194.346 19.7922 194.268 19.7531C194.19 19.7141 194.122 19.6574 194.07 19.5875L192.832 17.9375V20.75C192.832 20.8992 192.773 21.0423 192.667 21.1477C192.562 21.2532 192.419 21.3125 192.27 21.3125C192.12 21.3125 191.977 21.2532 191.872 21.1477C191.766 21.0423 191.707 20.8992 191.707 20.75V16.25C191.707 16.1319 191.744 16.0169 191.813 15.9211C191.882 15.8253 191.98 15.7537 192.092 15.7164C192.204 15.679 192.325 15.6779 192.437 15.7131C192.55 15.7483 192.649 15.8181 192.72 15.9125L194.52 18.3125L196.32 15.9125C196.39 15.8181 196.489 15.7483 196.602 15.7131C196.715 15.6779 196.835 15.679 196.947 15.7164C197.059 15.7537 197.157 15.8253 197.226 15.9211C197.295 16.0169 197.332 16.1319 197.332 16.25ZM202.582 20.75C202.582 20.8992 202.523 21.0423 202.417 21.1477C202.312 21.2532 202.169 21.3125 202.02 21.3125H199.395C199.245 21.3125 199.102 21.2532 198.997 21.1477C198.891 21.0423 198.832 20.8992 198.832 20.75V16.25C198.832 16.1008 198.891 15.9577 198.997 15.8523C199.102 15.7468 199.245 15.6875 199.395 15.6875C199.544 15.6875 199.687 15.7468 199.792 15.8523C199.898 15.9577 199.957 16.1008 199.957 16.25V20.1875H202.02C202.169 20.1875 202.312 20.2468 202.417 20.3523C202.523 20.4577 202.582 20.6008 202.582 20.75Z"
                fill="black"
              />
              <path
                d="M222.582 12.5H236.582"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div className={`${postMod.seperator}`} />
            <svg
              width="213"
              height="25"
              viewBox="0 0 213 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.58203 6.5V4.5H18.582V6.5H4.58203ZM4.58203 10.5V8.5H18.582V10.5H4.58203ZM1.58203 6.5C1.2987 6.5 1.06137 6.404 0.870035 6.212C0.678701 6.02 0.582701 5.78267 0.582035 5.5C0.581368 5.21733 0.677368 4.98 0.870035 4.788C1.0627 4.596 1.30003 4.5 1.58203 4.5C1.86403 4.5 2.1017 4.596 2.29503 4.788C2.48837 4.98 2.58403 5.21733 2.58203 5.5C2.58003 5.78267 2.48403 6.02033 2.29403 6.213C2.10403 6.40567 1.8667 6.50133 1.58203 6.5ZM1.58203 10.5C1.2987 10.5 1.06137 10.404 0.870035 10.212C0.678701 10.02 0.582701 9.78267 0.582035 9.5C0.581368 9.21733 0.677368 8.98 0.870035 8.788C1.0627 8.596 1.30003 8.5 1.58203 8.5C1.86403 8.5 2.1017 8.596 2.29503 8.788C2.48837 8.98 2.58403 9.21733 2.58203 9.5C2.58003 9.78267 2.48403 10.0203 2.29403 10.213C2.10403 10.4057 1.8667 10.5013 1.58203 10.5Z"
                fill="#4D4D4D"
              />
              <path
                d="M28.4154 6.25L25.4987 8.75L22.582 6.25"
                stroke="#4D4D4D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M49.8241 2.28187V6.43188H51.0141V0.921875H50.0641L48.4141 2.03187L48.8841 2.87187L49.8241 2.28187Z"
                fill="#4D4D4D"
              />
              <path
                d="M72.0156 3.67676C72.0156 3.41154 71.931 3.15719 71.7805 2.96965C71.6299 2.78211 71.4257 2.67676 71.2128 2.67676H54.0156V4.67676H71.2128C71.4257 4.67676 71.6299 4.5714 71.7805 4.38386C71.931 4.19633 72.0156 3.94197 72.0156 3.67676Z"
                fill="#4D4D4D"
              />
              <path
                d="M50.5141 9.50965C50.6171 9.50006 50.721 9.51161 50.8195 9.5436C50.9179 9.57559 51.0087 9.62735 51.0865 9.6957C51.1642 9.76405 51.2271 9.84755 51.2714 9.94109C51.3157 10.0346 51.3404 10.1362 51.3441 10.2397C51.3441 10.6197 51.1341 10.9797 50.4741 11.5097L48.4741 13.0797V14.0797H52.6141V12.9697H50.2741L51.2741 12.1997C52.2741 11.4997 52.5541 10.9297 52.5541 10.1997C52.5456 9.95028 52.4862 9.70526 52.3796 9.47967C52.273 9.25408 52.1214 9.05267 51.9341 8.88784C51.7467 8.723 51.5277 8.5982 51.2904 8.52113C51.0531 8.44406 50.8025 8.41633 50.5541 8.43965C50.1373 8.43723 49.7259 8.5339 49.3539 8.72167C48.9818 8.90944 48.6597 9.18295 48.4141 9.51965L49.1741 10.2497C49.3268 10.0328 49.5267 9.85356 49.7589 9.72537C49.991 9.59717 50.2492 9.52341 50.5141 9.50965Z"
                fill="#4D4D4D"
              />
              <path
                d="M71.8104 10.2559H54.6133V12.2559H71.8104C72.0234 12.2559 72.2276 12.1505 72.3781 11.963C72.5287 11.7754 72.6133 11.5211 72.6133 11.2559C72.6133 10.9906 72.5287 10.7363 72.3781 10.5488C72.2276 10.3612 72.0234 10.2559 71.8104 10.2559Z"
                fill="#4D4D4D"
              />
              <path
                d="M82.4466 6.25098L79.5299 8.75098L76.6133 6.25098"
                stroke="#4D4D4D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M109.248 1.48826C109.53 1.79108 109.514 2.26567 109.211 2.54829L104.925 6.54829C104.773 6.69027 104.569 6.76267 104.361 6.74818C104.154 6.7337 103.962 6.63363 103.831 6.4719L102.616 4.9719C102.356 4.64996 102.405 4.17769 102.727 3.91707C103.049 3.65645 103.522 3.70616 103.782 4.0281L104.49 4.90261L108.188 1.45171C108.49 1.16909 108.965 1.18545 109.248 1.48826Z"
                fill="#4D4D4D"
              />
              <path
                d="M112.449 4C112.449 3.58579 112.785 3.25 113.199 3.25H123.199C123.613 3.25 123.949 3.58579 123.949 4C123.949 4.41422 123.613 4.75 123.199 4.75H113.199C112.785 4.75 112.449 4.41422 112.449 4Z"
                fill="#4D4D4D"
              />
              <path
                d="M109.248 8.48826C109.53 8.79108 109.514 9.26567 109.211 9.54829L104.925 13.5483C104.773 13.6903 104.569 13.7627 104.361 13.7482C104.154 13.7337 103.962 13.6336 103.831 13.4719L102.616 11.9719C102.356 11.65 102.405 11.1777 102.727 10.9171C103.049 10.6564 103.522 10.7062 103.782 11.0281L104.49 11.9026L108.188 8.45171C108.49 8.16909 108.965 8.18545 109.248 8.48826Z"
                fill="#4D4D4D"
              />
              <path
                d="M112.449 11C112.449 10.5858 112.785 10.25 113.199 10.25H123.199C123.613 10.25 123.949 10.5858 123.949 11C123.949 11.4142 123.613 11.75 123.199 11.75H113.199C112.785 11.75 112.449 11.4142 112.449 11Z"
                fill="#4D4D4D"
              />
              <path
                d="M133.783 6.25L130.866 8.75L127.949 6.25"
                stroke="#4D4D4D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M173.281 0.807617C173.281 0.393404 172.945 0.0576172 172.531 0.0576172H154.531C154.117 0.0576172 153.781 0.393404 153.781 0.807617C153.781 1.22183 154.117 1.55762 154.531 1.55762H172.531C172.945 1.55762 173.281 1.22183 173.281 0.807617ZM173.281 4.80762C173.281 4.3934 172.945 4.05762 172.531 4.05762H154.531C154.117 4.05762 153.781 4.3934 153.781 4.80762C153.781 5.22183 154.117 5.55762 154.531 5.55762H172.531C172.945 5.55762 173.281 5.22183 173.281 4.80762ZM173.281 8.80762C173.281 8.39341 172.945 8.05762 172.531 8.05762H164.531C164.117 8.05762 163.781 8.39341 163.781 8.80762C163.781 9.22183 164.117 9.55762 164.531 9.55762H172.531C172.945 9.55762 173.281 9.22183 173.281 8.80762ZM173.281 12.8076C173.281 12.3934 172.945 12.0576 172.531 12.0576H164.531C164.117 12.0576 163.781 12.3934 163.781 12.8076C163.781 13.2218 164.117 13.5576 164.531 13.5576H172.531C172.945 13.5576 173.281 13.2218 173.281 12.8076Z"
                fill="#4D4D4D"
              />
              <path
                d="M156.656 8.92605C155.002 9.88089 154.175 10.3583 154.054 11.0471C154.024 11.2195 154.024 11.3958 154.054 11.5681C154.175 12.2569 155.002 12.7343 156.656 13.6892C158.31 14.644 159.137 15.1215 159.794 14.8822C159.959 14.8224 160.111 14.7342 160.245 14.6217C160.781 14.1721 160.781 13.2173 160.781 11.3076C160.781 9.39794 160.781 8.44309 160.245 7.99349C160.111 7.88101 159.959 7.79286 159.794 7.73302C159.137 7.49379 158.31 7.97121 156.656 8.92605Z"
                fill="#4D4D4D"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M193.281 0.807617C193.281 0.393404 193.617 0.0576172 194.031 0.0576172H212.031C212.445 0.0576172 212.781 0.393404 212.781 0.807617C212.781 1.22183 212.445 1.55762 212.031 1.55762H194.031C193.617 1.55762 193.281 1.22183 193.281 0.807617ZM193.281 4.80762C193.281 4.3934 193.617 4.05762 194.031 4.05762H212.031C212.445 4.05762 212.781 4.3934 212.781 4.80762C212.781 5.22183 212.445 5.55762 212.031 5.55762H194.031C193.617 5.55762 193.281 5.22183 193.281 4.80762ZM193.281 8.80762C193.281 8.3934 193.617 8.05762 194.031 8.05762H202.031C202.445 8.05762 202.781 8.3934 202.781 8.80762C202.781 9.22183 202.445 9.55762 202.031 9.55762H194.031C193.617 9.55762 193.281 9.22183 193.281 8.80762ZM193.281 12.8076C193.281 12.3934 193.617 12.0576 194.031 12.0576H202.031C202.445 12.0576 202.781 12.3934 202.781 12.8076C202.781 13.2218 202.445 13.5576 202.031 13.5576H194.031C193.617 13.5576 193.281 13.2218 193.281 12.8076Z"
                fill="#4D4D4D"
              />
              <path
                d="M209.906 8.92605C211.56 9.88089 212.387 10.3583 212.508 11.0471C212.539 11.2195 212.539 11.3958 212.508 11.5681C212.387 12.2569 211.56 12.7343 209.906 13.6892C208.252 14.644 207.425 15.1214 206.768 14.8822C206.604 14.8224 206.451 14.7342 206.317 14.6217C205.781 14.1721 205.781 13.2173 205.781 11.3076C205.781 9.39793 205.781 8.44309 206.317 7.99349C206.451 7.88101 206.604 7.79286 206.768 7.73301C207.425 7.49379 208.252 7.97121 209.906 8.92605Z"
                fill="#4D4D4D"
              />
            </svg>
          </div>
          <Form.Control
            type="text"
            placeholder="Nhập vào tiêu đề nội dung"
            className={`${postMod.form} text-muted py-2 rounded-top-0`}
          />
        </Form.Group>
      </Form>
      <Form>
        <Form.Group>
          <Form.Label>Danh mục</Form.Label>
          {/* <Form.Control
            type="text"
            placeholder="Chọn danh mục"
            className={`${postMod.form} text-muted py-2`}
          /> */}
          <Form.Select className={`${postMod.form} text-muted py-2`}>
            <option value="1">Học ReactJS với TTO</option>
            <option value="2">Học NodeJS với TTV</option>
          </Form.Select>
        </Form.Group>
      </Form>

      <Button className={`${postMod.addBtn} ${mod.btnCTA}`}>Thêm vào</Button>
    </div>
  );
};

export default AddMarketingPost;