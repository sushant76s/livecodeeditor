import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const CustomCard = ({
  image,
  altText,
  title,
  description,
  buttonText,
  onButtonClick,
  userAction,
}) => {
  return (
    <Card sx={{ mb: 2 }}>
      {image && (
        <CardMedia component="img" height="400" image={image} alt={altText} />
      )}
      <CardContent>
        {title && (
          <Typography variant="h5" component="div" gutterBottom>
            {title}
          </Typography>
        )}
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
        {buttonText && (
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        )}
        {userAction}
      </CardContent>
    </Card>
  );
};

export default CustomCard;
