import React, { Component } from "react";
import axios from "axios";
import "../styles.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { GalleryThumb } from "./GalleryThumb";

export class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      activeImgIndex: 0
    };
  }
  //when component mounts: make api call, store images in state and start timer
  componentDidMount() {
    // start timer and store it in state so we can access and clear it later
    let timerVar = setInterval(this.changeActiveImg, 3000);
    this.setState({ timer: timerVar });
    //call api and store data in state
    axios
      .get(
        "https://api.giphy.com/v1/gifs/trending?api_key=PEyIrGaWdf08Lw4nezyXejpD9Y0pO6Rt"
      )
      .then(response => {
        //transform response array to only store data we need in state
        const transformedImgArray = response.data.data.map(element => {
          return {
            id: element.id,
            title: element.title,
            originalURL: element.images.original.url,
            stillURL: element.images.fixed_width_still.url
          };
        });
        this.setState(state => {
          return {
            images: transformedImgArray
          };
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  //clear the timer when component unmounts
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
  //change the activeImgIndex to the index of the next image
  changeActiveImg = () => {
    this.setState(state => {
      if (state.activeImgIndex + 1 < state.images.length) {
        return { activeImgIndex: state.activeImgIndex + 1 };
      } else {
        return { activeImgIndex: 0 };
      }
    });
  };
  //when clicked on an image set it as active
  selectActiveHandler = index => {
    this.setState({ activeImgIndex: index });
  };
  //when clicked on a delete button delete that image from the images array
  deleteHandler = index => {
    const imagesArray = this.state.images;
    imagesArray.splice(index, 1);
    this.setState({ images: imagesArray });
  };
  render() {
    let appJSX = null;
    if (this.state.images.length > 0) {
      appJSX = (
        <div>
          <div className="active-gallery">
            <div className="active-gallery__viewport">
              <ReactCSSTransitionGroup
                transitionName="carousel"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
              >
                <img
                  className="active-gallery__viewport__active-image"
                  src={this.state.images[this.state.activeImgIndex].originalURL}
                  alt={this.state.images[this.state.activeImgIndex].title}
                  key={this.state.images[this.state.activeImgIndex].id}
                />
              </ReactCSSTransitionGroup>
            </div>
          </div>
          <GalleryThumb
            images={this.state.images}
            selectActiveHandler={this.selectActiveHandler}
            deleteHandler={this.deleteHandler}
          />
        </div>
      );
    }
    return <div>{appJSX}</div>;
  }
}
