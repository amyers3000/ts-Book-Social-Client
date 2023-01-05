import { Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button, Alert, IconButton, Box } from '@mui/material'
import parse from 'html-react-parser'
import ClearIcon from '@mui/icons-material/Clear';
import { Errors } from '../../App/lib';



interface Props {
    title: string
    author: string[] | string
    description: string
    handleClose: () => void
    open: boolean
    handleSave: () => void
    error : Errors | null

}

const BookPopup = ({ title, author, description, handleClose, open, handleSave, error }: Props) => {
    return (
        <Dialog
            open={open}
            scroll='paper'
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {!!error && <Alert severity='error'>
                {`${error.code} : ${error.message}`}
            </Alert>}
            <Box display='flex' justifyContent='space-between'>
            <DialogTitle id="modal-modal-title">
                {title}
            </DialogTitle>
            <IconButton onClick={handleClose} sx={{mr: 2}}>
                        <ClearIcon sx={{ pl: 1, pr: 1}} />
            </IconButton>
            </Box>
            <DialogContentText sx={{ pl: 3 }}>
                {author ? author[0] : ""}
            </DialogContentText>
            <DialogContent dividers>
                <DialogContentText>
                    {description ? parse(description) : "None"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleSave()}>Add to Favorites</Button>
            </DialogActions>
        </Dialog>
    )
}

export default BookPopup