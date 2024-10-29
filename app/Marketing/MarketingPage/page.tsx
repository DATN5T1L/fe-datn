import { Button, Stack } from "react-bootstrap";

// Dashboard
const MarketingDashboard = () => {
  return (
    <Stack gap={2}>
      <Button href="MarketingPage/MarketingPosts">Posts</Button>
      <Button href="MarketingPage/MarketingComments">Comments</Button>
      <Button href="MarketingPage/MarketingCategories">Categories</Button>
    </Stack>
  );
};

export default MarketingDashboard;
