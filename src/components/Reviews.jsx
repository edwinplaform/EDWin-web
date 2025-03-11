import moment from "moment";
import {Rate} from "antd";

const Reviews = ({review}) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-1">{review.title}</h2>
            <div className="flex space-x-2">
                <p className="text-[14px]">by <b>{review.User ? `${review.User.firstName} ${review.User.lastName}` : "Anonymous"}</b> |
                </p>
                <p className="text-[14px] opacity-60">posted on {moment(review.createdAt).format("MM DD, YYYY")}</p>
            </div>
            <div className="py-3">
                <Rate disabled value={review.rating} className="text-yellow-500"/>
            </div>
            <div className="mb-5 text-[15px]">
                <p>{review.comment}</p>
            </div>
        </div>
    )
}

export default Reviews;