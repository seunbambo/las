import React,{useState, useEffect} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import {BASEURL, sendHttpRequestWithFormDataWithoutHeadersSearch, sendHttpRequestWithErrorGet, sendHttpRequestWithError, sendHttpRequestWithFormDataWithObject, sendHttpRequestWithAuthHeaders, sendHttpRequestWithFormData, sendHttpRequestWithFormDataWithoutHeaders} from '../../helpers/apiMethods';
import './searchButton.css'

import useForm from 'react-hook-form'


const StyledTableCell = withStyles(theme => ({
 
  head: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    position: 'relative',
    backgroundColor: "#EAFAF1"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  eachRow: {
    paddingTop: '2px!important',
    paddingBottom: '2px!important',
    fontFamily: 'Montserrat'
  },
  eachRow2: {
    paddingTop: '5px!important',
    paddingBottom: '5px!important',
    fontFamily: 'Montserrat',
    cursor:'pointer'
  },
  formContainer: {
    width:'60%', 
    margin:'auto',
    [theme.breakpoints.down('sm')]: {
     width:'100%',

    },  
  },
  iconButton: {
    fontSize: 14,
    marginLeft: 3,
    color: 'white',
    padding: '10px 30px',
    backgroundColor: "#00d4a8",
    borderRadius: 4
  },
  tableContainer: {
    marginTop: 20
  },
  
  iconButton2: {
    fontSize: 14,
    marginLeft: 3,
    color: 'white',
    padding: 6,
    
    backgroundColor: "#00d4a8",
    borderRadius: 4
  },
  divider: {
    height: 28,
    margin: 4
  }
}));


export default function SearchButton(props) {
  const { register, handleSubmit, errors } = useForm()
  const classes = useStyles();
  let history = useHistory();
const [suggestions, changeSuggestions] = useState([])
const [text, changeText] = useState('')
const [allDirectory, changeDirectory] = useState([])



const onSubmit = data => {
  const searchUrl = BASEURL+'/search/news'
  console.log("this is the data",data)
  if(data.search != "" || data.search != null){
    const formDataSearch = new FormData();
    formDataSearch.append('search', data.search)
    sendHttpRequestWithFormDataWithoutHeadersSearch('POST', searchUrl, formDataSearch).then(responseData=>{            
      if(responseData.data != null || responseData.data != undefined || responseData.data != []){
        console.log("datas", responseData.data)
        changeDirectory(responseData.data)
      }
      else if(responseData=="error") {
        console.log("error in search request")
        changeDirectory(null)
      }
      
    });
  }
  else  {
    changeText("Input your search text before clicking the search Button")
  }
}

const verifier = (str) => {
  if(str===0){
    return "Not Verified"
  }
  else {
    return "Verified"
  }
}

const getDate = (date) => {
  if(date!=null){
    const newDate = date.split(' ')
    return newDate[0]
  } 
} 
const goto = (link) => {
  history.push(`/news/${link}`)
}

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Paper component="form" className={classes.root}>
      <InputBase
        name="search"
        required
        inputRef = {register}
        className={classes.input}
        placeholder="Search..."
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        Search
      </IconButton>
      
     
    </Paper>
    <span style={{color: 'red'}}></span>
   </form>

  <Paper className={classes.tableContainer}>
  <Table className={classes.table} aria-label="customized table">
    <TableHead style={{padding:1}}>
      <TableRow style={{padding:1}}>
       
       
      </TableRow>
    </TableHead>
    {allDirectory !=null &&
    <TableBody>
      
    {allDirectory.map(row =>(
        <StyledTableRow key={row.name}>
          <StyledTableCell align="left" className={classes.eachRow2} onClick={()=>goto(row.id)} >{row.title}</StyledTableCell>
         
        </StyledTableRow>
      ))}
    </TableBody>
    }
    
  </Table>
  {allDirectory ==null &&
    
      
 
    <div style={{paddingTop:20, paddingBottom:20}}>
       <center style={{color:'red', fontWeight:'bold'}}>No Content found</center>
     </div>

 }
</Paper>


   
   </>
  
  );
}
