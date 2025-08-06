

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <ImageList
      sx={{ width: 970, height: 525 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item,index) => (
        <ImageListItem key={index} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: '/public/pictures/elad/e1.jpg',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: '/public/pictures/elad/e2.jpg',
    title: 'Burger',
  },
  {
    img: '/public/pictures/elad/e3.jpg',
    title: 'Camera',
  },
  {
    img: '/public/pictures/elad/e4.jpg',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: '/public/pictures/elad/e5.jpg',
    title: 'Hats',
    cols: 1,
    rows: 2,
  },
   {
    img: '/public/pictures/elad/e7.jpg',
    title: 'Basketball',
  },
   {
    img: '/public/pictures/elad/e7.jpg',
    title: 'Basketball',
  },
  {
    img: '/public/pictures/elad/e1.jpg',
    title: 'Fern',
  }, {
    img: '/public/pictures/elad/e5.jpg',
    title: 'Hats',
    cols: 1,
    rows: 2,
  },
  {
    img: '/public/pictures/elad/e10.jpg',
    title: 'Fern',
  },{
    img: '/public/pictures/elad/e7.jpg',
    title: 'Basketball',
  },
  {
    img: '/public/pictures/elad/e7.jpg',
    title: 'Basketball',
  },
  {
    img: '/public/pictures/elad/e2.jpg',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: '/public/pictures/elad/e3.jpg',
    title: 'Tomato basil',
  },
  {
    img: '/public/pictures/elad/e4.jpg',
    title: 'Sea star',
  },
  {
    img: '/public/pictures/elad/e6.jpg',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: '/public/pictures/elad/e7.jpg',
    title: 'Basketball',
  },
   {
    img: '/public/pictures/elad/e7.jpg',
    title: 'Basketball',
  },
  {
    img: '/public/pictures/elad/e9.jpg',
    title: 'Fern',
     author: '@arwinneil',
 
  },
    {
    img: '/public/pictures/elad/e9.jpg',
    title: 'Fern',
     author: '@arwinneil',
   
  },
  {
    img: '/public/pictures/elad/e2.jpg',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: '/public/pictures/elad/e3.jpg',
    title: 'Tomato basil',
  },
  {
    img: '/public/pictures/elad/e4.jpg',
    title: 'Sea star',
  },
  {
    img: '/public/pictures/elad/e5.jpg',
    title: 'Bike',
    cols: 2,
  }, {
    img: '/public/pictures/elad/e8.jpg',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
 {
    img: '/public/pictures/elad/e6.jpg',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: '/public/pictures/elad/e7.jpg',
    title: 'Basketball',
  }, {
    img: '/public/pictures/elad/e11.jpg',
    title: 'Burger',
  },
   {
    img: '/public/pictures/elad/e7.jpg',
    title: 'Burger',
  }, {
    img: '/public/pictures/elad/e6.jpg',
    title: 'Burger',
  },  {
    img: '/public/pictures/elad/e5.jpg',
    title: 'Hats',
    cols: 2,
    rows: 1,
  },
   {
    img: '/public/pictures/elad/e10.jpg',
    title: 'Fern',
    cols:2

  }
];










//inline box
//////////////////////////////


// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// export default function BasicModal() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <div>
//       <Button onClick={handleOpen}>Open modal</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Text in a modal
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//           </Typography>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

