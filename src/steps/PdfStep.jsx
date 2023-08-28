import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

// Create styles


Font.register({
  family: 'OpenSans',
  src: '/assets/fonts/OpenSans-Regular.ttf'
});

Font.register({
  family: 'OpenSansBold',
  src: '/assets/fonts/OpenSans-Semibold.ttf'
});


const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: 'OpenSans',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  author: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 11,
  },
  text: {
    fontSize: 11,
    lineHeight: 1.5,

  },
  textbold: {
    fontSize: 11,
    textAlign: 'justify',
    fontFamily: 'OpenSansBold',
    marginBottom: 5,
    width: '100%'
  },
  heading: {
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'OpenSansBold',
    marginBottom: 5,
    width: '100%'
  },
  textsmall: {
    fontSize: 10,
    textAlign: 'justify',
    fontFamily: 'OpenSansBold',
    width: '100%'
  },
  logo: {
    height: 40, 
    width: 114,
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  textrowsmall: {
    fontSize: 9,
    width: '100%'
  },
  textrowsmallgray: {
    fontSize: 9,
    width: '100%',
    color: '#505050',
  },
  row: {
    flexDirection: 'row',
    flexGrow: 1,
    maxHeight: 280,
  },
  left: {
    // width: '33%',//<- working alternative
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 220,
  },
  graybox: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    maxWidth: 400,
  },
  right: {
    padding: 5,
    flexDirection: 'row',
    width: '30%', //<- working alternative
    flexShrink: 0,
    flexGrow: 1,
    flexWrap: 'wrap',
    textAlign: 'right',
    justifyContent: 'flex-end',
    alignContent: 'flex-start'

  },
  estimrow: {
    flexDirection: 'row',
    flexGrow: 1,
    fontSize: 10,
  },
  estimrowsub: {
    flexDirection: 'row',
    flexGrow: 1,
    fontSize: 9,
    paddingLeft: 10,
  },
  estimrowleft: {
    width: '70%',
  },
  estimrowright: {
    width: '30%', 
    textAlign: 'right',
  },
  grayboxtop: {
    width: '80%', 
    backgroundColor: '#f0f0f0',
    padding: 10,
  }, room: {
    fontSize: 12,
    fontFamily: 'OpenSansBold',
  }
});

// Create Document Component
const MyDocument = ({ getImageURL, pdfRows, total,vat, total_ttc  }) => (
  <Document>
    <Page style={styles.body}>
      
    <View style={styles.row}>
        <View  style={styles.left}>
          
          <Image
            style={styles.logo}
            src="/assets/img/logo.png"
          />

          <Text style={[{ height: '20' }]}></Text>
          <Text style={styles.textbold}>BEL AIR</Text>
          <Text style={[styles.textrowsmall]}>48 Av. d'Enghien</Text>
          <Text style={[styles.textrowsmall]}>93800 Épinay-sur-Seine</Text>
          <Text style={[styles.textrowsmall]}>Site internet : https://www.entreprisebelair.com/ </Text>
          <Text style={[styles.textrowsmall]}>Email : contact@entreprisebelair.com</Text>
          <Text style={[styles.textrowsmall]}>Tél. : 09 77 95 14 45</Text>
          <Text style={[{ height: '10' }]}></Text>
          <Text style={[styles.textrowsmallgray]}>Sas au capital de 10 000 €</Text>
          <Text style={[styles.textrowsmallgray]}>Siret : 90119729300011</Text>
          <Text style={[styles.textrowsmallgray]}>RCS Bobigny - Siren : 901197293</Text>
          <Text style={[styles.textrowsmallgray]}>No TVA : FR34901197293</Text>
          <Text style={[styles.textrowsmallgray]}>IBAN : FR76 1020 7001 5123 2104 1679 534 BIC : CCBPFRPPMTG</Text>

        </View>
        <View style={styles.right}>
          <View  style={styles.grayboxtop}>
            <Text style={[styles.textbold, { textAlign: 'right' }]}>
              A l'attention de :
            </Text>
            <Text style={[ styles.textsmall , { textAlign: 'right' }]}>
              Leila Auvray
              22 Rue Frémicourt 75015 Paris
            </Text>
          </View>
        </View>
      </View>
      
      <Text style={[{ height: '20' }]}></Text>
      <Text style={styles.heading}>Travaux de renovation</Text>
      <Text style={[{ height: '1' }]}></Text>
      <Text style={styles.text}>Madame, Monsieur,</Text>
      <Text style={styles.text}>Voici notre devis qui comporte l'intégralité des prestations de fournitures et main d'oeuvre.  </Text>
      <Text style={styles.text}>Nous restons à votre disposition pour toute question ou modification du devis, et espérons que notre entreprise vous apportera entière satisfaction.  </Text>
      <Text style={styles.text}>Nous vous prions d'agréer, Madame, Monsieur, nos sincères salutations.  </Text>
      <Text style={[{ height: '20' }]}></Text>

      <View style={styles.graybox}>
        <Text style={[styles.textbold]}>Récapitulatif des lots</Text>

        {pdfRows && Object.keys(pdfRows).map((room, roomindex) => (
          <>
            <Text style={[styles.room]}>{room}</Text>
            {pdfRows[room].map((row, index) => (
              <>
                  { (
                    <View>
                      <View style={styles.estimrow}>
                        <Text style={[styles.estimrowleft]}>{index + 1}. {row.name}</Text>
                        <Text style={[styles.estimrowright]}>{row.amount > 0 ? row.amount+'€': ''}</Text>
                      </View>

                      {row['additional'] && Object.keys(row['additional']).map((additional_key, index) => (
                        <View style={styles.estimrowsub}>
                          <Text style={[styles.estimrowleft]}>- {row['additional'][additional_key].key}</Text>
                          <Text style={[styles.estimrowright]}>{row['additional'][additional_key].amount}€</Text>
                        </View>
                      ))}
                
                      <Text style={[{ height: '2' }]}></Text>
                    </View>
                
                  )}
              </>
            ))}
            <Text style={[{ height: '10' }]}></Text>
          </>
         ))}
    

        

        <Text style={[{ height: '20' }]}></Text>

        <View style={ styles.estimrow }>
          <Text style={[styles.estimrowleft ]}>Total works excluding tax</Text>
          <Text style={[styles.estimrowright]}>{ total.toFixed(2) }€</Text>
        </View>


        <View style={ styles.estimrow }>
          <Text style={[styles.estimrowleft]}>10% VAT on the basis of €{ total }</Text>
          <Text style={[styles.estimrowright]}>{ vat.toFixed(2) }€</Text>
        </View>


        <View style={ styles.estimrow }>
          <Text style={[styles.estimrowleft ]}>Total works including VAT</Text>
          <Text style={[styles.estimrowright]}>{ total_ttc.toFixed(2)  }€</Text>
        </View>

        <Text style={[{ height: '20' }]}></Text>

        <View style={[ styles.estimrow , { fontSize: 12, fontFamily:'OpenSansBold' }]}>
          <Text style={[styles.estimrowleft ]}>Total TTC</Text>
          <Text style={[styles.estimrowright]}>{ total_ttc.toFixed(2)  }€</Text>
        </View>
      </View>

      

      <Text style={[{ height: '40' }]}></Text>
      <Text style={styles.heading}>Médiateur de la consommation</Text>
      <Text style={[{ height: '1' }]}></Text>
      <Text style={styles.text}>En cas de différend qui pourrait apparaître pour l’exécution du contrat, le client et l’entreprise privilégieront la recherche d’une solution amiable après une réclamation écrite du client auprès de l’entreprise. Si aucune solution amiable n’est trouvée, le client peut soumettre le différend au médiateur de la consommation: CM2C, 14 Rue Saint-Jean-Baptiste de la Salle, 75006 Paris, France, 01 89 47 00 14
, https://www.cm2c.net/</Text>


 
    
    
    <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
      `${pageNumber} / ${totalPages}`
    )} fixed />
  </Page>
</Document>
);




const App = ({ getImageURL, pdfRows, total }) => {
  

  let vat = total * 0.1;
  let total_ttc = total + vat;

  return (
    <div className="pdf">
      <div className="message">
        <img src="/assets/img/renovationsupport.jpg" alt="Close" />
      
        <h1>Some Title Here</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        <div className="button"  >
               Get Support
        </div>

     </div>
      <PDFViewer scale={0.56}>
        <MyDocument getImageURL={getImageURL} pdfRows={pdfRows} total={total} vat={vat} total_ttc={ total_ttc } />
      </PDFViewer>
    
    </div>
  );
};
// ReactDOM.render(<App />, document.getElementById('root'));


export default App;