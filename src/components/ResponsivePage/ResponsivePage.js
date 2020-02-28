import React from 'react';
import ClientLayout from '../../layouts/ClientLayout'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function ResponsivePage(props) {
  const classes = useStyles();

  return (
    <ClientLayout paddingTop='30px' width="100%" showCurvedFooter={false} showFooter={true} showBackgroundImage={false} backgroundColor="white" height="900px">
     
    <div className="rules" style={{width: props.desiredWidth}}>   
        <div style={{marginBottom: 100}}>
            <h1>{props.title}</h1>
            <p>{props.subHeader}</p>

            {props.children}

        </div>

    </div>
    </ClientLayout>
  );
}
