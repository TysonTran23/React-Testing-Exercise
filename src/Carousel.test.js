import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

//Smoke test
it("should render", () => {
  render(<Carousel photos={TEST_IMAGES} title={"images for testing"} />);
});

//Snapshot test
it("should match snapshot", () => {
  const { asFragment } = render(
    <Carousel photos={TEST_IMAGES} title={"images for testing"} />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should show photo #1 after clicking left arrow", () => {
  const { getByText, getByTestId, debug } = render(
    <Carousel photos={TEST_IMAGES} title={"images for testing"} />
  );
  const rightBtn = getByTestId("right-button");

  fireEvent.click(rightBtn);
  const leftBtn = getByTestId("left-button");
  fireEvent.click(leftBtn);
  const firstImg = getByText("testing image 1");
  expect(firstImg).toBeInTheDocument();
});

it("should hide arrow keys at the end of carousel", () => {
  const { queryByTestId } = render(
    <Carousel photos={TEST_IMAGES} title={"images for testing"} />
  );
  const rightBtn = () => queryByTestId("right-button");
  const leftBtn = () => queryByTestId("left-button");
  expect(leftBtn()).not.toBeInTheDocument();
  while (rightBtn()) {
    fireEvent.click(rightBtn());
  }
  expect(rightBtn()).not.toBeInTheDocument();
});
