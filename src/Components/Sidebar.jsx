import { Paper,Avatar, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'

const Sidebar = () => {
  return (
    <div>
        <Paper>
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