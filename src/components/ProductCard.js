import * as React from "react";
import Card from "@mui/material/Card";
import {
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

export default function ProductCard(props) {
  const { data } = props; // access product data from main component

  return (
    <Card sx={{ textAlign: "left" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={data.image}
          alt="product image"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {data.name}
          </Typography>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItem: "center",
            }}
            variant="body2"
            color="text.secondary"
          >
            Category:
            <Typography variant="body2" color="text.primary">
              {data.category}
            </Typography>
            <Typography sx={{ ml: 3 }} variant="body2" color="#0087ff">
              Rs.{data.price}
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
