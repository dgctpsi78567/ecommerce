import React from "react";
import StarRatings from "react-star-ratings";

export const showAverage = (p) => {
    if (p && p.ratings) {

        let ratingArray = p && p.ratings;
        // console.log("ratingArray", ratingArray);

        let total = [];
        let length = ratingArray.length;
        // console.log("leangth", length);

        ratingArray.map((r) => total.push(r.star));
        let totalReduce = total.reduce((p, n) => p + n, 0)
        // console.log("start total", total);
        // console.log("totalReduce", totalReduce);

        let highest = length * 5;
        // console.log("highest", highest);

        let result = (totalReduce * 5) / highest;
        // console.log("result", result);

        return (
            <React.Fragment>
                <StarRatings
                    starDimension="20px"
                    starSpacing="2px"
                    rating={result}
                    size="50"
                    starRatedColor="red" />
                {p.ratings.length}
            </React.Fragment>);

    }
}