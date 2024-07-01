import { Paper,Avatar, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'

const Sidebar = () => {
  return (
    <div>
        <Paper elevation={0} sx={{border:"1px solid #D4D4D4"}}>
            <List>
                <ListItem>
                    <Avatar/>
                    <ListItemText/>
                </ListItem>
            </List>
        </Paper>
    </div>
  )
}

export default Sidebar