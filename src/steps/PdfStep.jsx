import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
        backgroundColor: '#ffffff',
        textAlign: 'center',
    },
    header: {
        fontSize: 18,
        textAlign: 'center',
    },
    section: {
        fontSize: 14,
        margin: 10,
        padding: 10,
        flexGrow: 1
  }

});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header} fixed>
                Estimate Document
      </Text>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);



const App = () => (
   <div className="pdf"> 
        <PDFViewer>
            <MyDocument />
        </PDFViewer>
    </div>
);
// ReactDOM.render(<App />, document.getElementById('root'));


export default App;