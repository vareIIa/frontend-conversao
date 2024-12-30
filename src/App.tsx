import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  CircularProgress,
  AppBar,
  Toolbar,
  TextField,
  Grow

} from '@mui/material';

import Logo from './assets/logo_maranhao.png'
import LogoIPGC from './assets/logo_ipgc.png'

import './App.css';

function App() {

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [courseName, setCourseName] = useState('');
  const [showPopup, setShowPopup] = useState(true);
  const [step, setStep] = useState(0);

  const [docxButtonStatus, setDocxButtonStatus] = useState('default');
  const [pdfButtonStatus, setPdfButtonStatus] = useState('default');
  const [imageButtonStatus, setImageButtonStatus] = useState('default');


  const FILESERVER_UPLOAD_DOCX = `http://127.0.0.1:5000/upload-docx`;
  const FILESERVER_CONFIRM = `http://127.0.0.1:5000/processar-cursos`;
  const FILESERVER_UPLOAD_PDF = `http://127.0.0.1:5000/upload-pdf`;
  const FILESERVER_UPLOAD_IMAGES = `http://127.0.0.1:5000/upload-images`;


  const handleFileImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    setImageButtonStatus('loading');
    const fileArray = Array.from(files);
    setUploadedImages((prev) => [...prev, ...fileArray]);

    const formData = new FormData();
    fileArray.forEach((file) => {
      formData.append('png_file', file);
    });


    try {
      const response = await fetch(FILESERVER_UPLOAD_IMAGES, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setImageButtonStatus('success');
        setTimeout(() => setImageButtonStatus('default'), 300000);
      } else {
        setImageButtonStatus('error');
        setTimeout(() => setImageButtonStatus('default'), 3000);
      }
    } catch (error) {

      setImageButtonStatus('error');
      console.error('Erro no upload:', error);
      setTimeout(() => setImageButtonStatus('default'), 3000);
    }

  };

  const handleFileDocx = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setDocxButtonStatus('loading');
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('docx_file', file);
    });


    try {
      const response = await fetch(FILESERVER_UPLOAD_DOCX, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setDocxButtonStatus('success');
        setTimeout(() => setDocxButtonStatus('default'), 300000);
      } else {
        setDocxButtonStatus('error');
        setTimeout(() => setDocxButtonStatus('default'), 3000);
      }
    } catch (error) {

      setDocxButtonStatus('error');
      console.error('Erro no upload:', error);
      setTimeout(() => setDocxButtonStatus('default'), 3000);
    }

  };

  const handleFilePdf = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setPdfButtonStatus('loading');
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('pdf_file', file);
    });


    try {
      const response = await fetch(FILESERVER_UPLOAD_PDF, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setPdfButtonStatus('success');
        setTimeout(() => setPdfButtonStatus('default'), 300000);
      } else {
        setPdfButtonStatus('error');
        setTimeout(() => setPdfButtonStatus('default'), 3000);
      }
    } catch (error) {

      setPdfButtonStatus('error');
      console.error('Erro no upload:', error);
      setTimeout(() => setPdfButtonStatus('default'), 3000);
    }

  };

  const handleConfirm = async () => {
    if (!courseName) {
      alert('Por favor, insira o nome do curso.');
      return;
    }

    setConfirmLoading(true);
    try {

      // const nameResponse = await fetch(FILESERVER_CONFIRM, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name: courseName }),
      // });

      // if (!nameResponse.ok) {
      //   alert('Erro ao enviar o nome do curso!');
      //   setLoading(false);
      //   return;
      // }


      const processResponse = await fetch(FILESERVER_CONFIRM, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: courseName }),
      });

      if (processResponse.ok) {
        alert('Arquivos processados com sucesso!');
      } else {
        alert('Erro ao processar arquivos!');
      }
    } catch (error) {
      console.error('Erro no processamento:', error);
      alert('Erro ao processar!');
    }
    setConfirmLoading(false);
  };

  const handleAgree = () => {
    setShowPopup(false);
  };




  return (

    <Box
      sx={{
        display: 'flex',
        height: 'auto',
        minWidth: '100vw',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {showPopup && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1300,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: '20px',
              height: '38vh',
              textAlign: 'center',
              maxWidth: '600px',
              width: '600px',


            }}
          >
            <Typography variant="h6" gutterBottom marginBottom={{ xs: 2, sm: 3 }} fontSize={{ xs: '1.5rem', sm: '1.6rem' }}>
              <strong>Tutorial de Postagem</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Para que o curso seja postado de forma <strong>COMPLETA E CORRETA</strong> na plataforma, siga os seguintes passos:
            </Typography>
            <Paper sx={{ padding: '10px', backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '35px', marginBottom: '15px', height: 'auto' }}>
              <Typography variant="body1" gutterBottom>
                1. Envie o DOCX com o <strong>CONTEÚDO  COMPLETO DO CURSO. </strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                2. Envie o arquivo PDF para ser postado como <strong>CONTEÚDO OFF.</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                3. Envie uma imagem para ser a <strong>CAPA DO CURSO.</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                4. Escreva o <strong>NOME DO CURSO.</strong> e clique em <strong>CONFIRMAR.</strong> 
              </Typography>
            </Paper>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAgree}
              sx={{ marginTop: '10px' }}
            >
              Concordar
            </Button>
          </Paper>
        </Box>
      )}
      <AppBar position="static">
        <Toolbar>
          <img src={Logo} alt="Logo" style={{ width: '120px', height: '35px', marginRight: '10px' }} />
          <Typography variant="h6" sx={{ flexGrow: 2 }}>
            CONTROLE DE POSTAGENS
          </Typography>
          <img src={LogoIPGC} alt="Logo" style={{ width: '140px', height: '30px', marginRight: '10px' }} />
        </Toolbar>
      </AppBar>



      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
         

        }}
      >
        <Paper
          elevation={3}
          sx={{
            
            padding: '20px',
            marginBottom: '20px',
            textAlign: 'center',
            backgroundColor: '#ffffff'
            
          }}
        >




          <Typography variant="h5" gutterBottom marginTop={2}>
            <strong>ARQUIVOS NECESSÁRIOS</strong></Typography>
          <Typography fontSize={"75%"} gutterBottom marginTop={0}>
            Selecione o arquivo para liberar o próximo passo</Typography>
            


          <Box sx={{ marginTop: '50px', display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px', width: '60vw', alignItems: 'center' }}>

            {step >= 0 && (
              <Grow in={step >= 0} timeout={500}>
                <Paper sx={{ padding: '20px', marginBottom: '20px', width: '20vw' }}>
                  <Typography variant="h5" gutterBottom>
                    Enviar <strong>DOCX</strong>
                  </Typography>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      marginBottom: '20px',
                      width: '10vw',
                      backgroundColor:
                        docxButtonStatus === 'success' ? 'green' :
                          docxButtonStatus === 'error' ? 'red' :
                            'primary.main',
                      color: docxButtonStatus === 'loading' ? 'white' : 'white',
                      transition: 'background-color 0.3s',
                    }}
                  >
                    {docxButtonStatus === 'loading' ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      'Selecionar'
                    )}
                    <input
                      type="file"
                      accept=".docx"
                      multiple
                      hidden
                      onChange={(e) => { handleFileDocx(e); setStep(1) }}
                    />
                  </Button>
                  <Typography variant="h4" fontSize={'70%'} marginBottom={2}>Esse DOCX será convertido em conteúdo para a plataforma.</Typography>
                </Paper>
              </Grow>
            )}

            {step >= 1 && (
              <Grow in={step >= 1} timeout={500}>
                <Paper sx={{ padding: '20px', marginBottom: '20px', width: '20vw' }}>
                  <Typography variant="h5" gutterBottom>
                    Enviar <strong>PDF</strong>
                  </Typography>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      marginBottom: '20px',
                      width: '10vw',
                      backgroundColor:
                        pdfButtonStatus === 'success' ? 'green' :
                          pdfButtonStatus === 'error' ? 'red' :
                            'primary.main',
                      color: docxButtonStatus === 'loading' ? 'white' : 'white',
                      transition: 'background-color 0.3s',
                    }}
                  >
                    {pdfButtonStatus === 'loading' ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      'Selecionar'
                    )}
                    <input
                      type="file"
                      accept=".pdf"
                      multiple
                      hidden
                      onChange={(e) => { handleFilePdf(e); setStep(2) }}
                    />
                  </Button>
                  <Typography variant="h5" fontSize={'70%'} marginBottom={2}>Esse PDF será inserido dentro da plataforma.</Typography>

                </Paper>
              </Grow>
            )}
          </Box>



          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              padding: 0,
              margin: 0,
            }}
          >




            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',

              }}
            >

              {step >= 2 && (
                <Grow in={step >= 2} timeout={500}>
                  <Paper sx={{ padding: '20px', marginBottom: '20px', maxWidth: '30vw', width: '30vw' }}>
                    <Typography variant="h6" gutterBottom>
                      Enviar <strong>IMAGEM</strong>
                    </Typography>
                    <Typography variant="h6" fontSize={'75%'} marginBottom={2}>Essa imagem será utilizada como <strong>CAPA</strong> do curso.</Typography>

                    <Button
                      variant="contained"
                      component="label"
                      sx={{
                        marginBottom: '20px',
                        width: '10vw',
                        backgroundColor:
                          imageButtonStatus === 'success' ? 'green' :
                            imageButtonStatus === 'error' ? 'red' :
                              'primary.main',
                        color: docxButtonStatus === 'loading' ? 'white' : 'white',
                        transition: 'background-color 0.3s',
                      }}
                    >
                      {imageButtonStatus === 'loading' ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        'Selecionar'
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        onChange={(e) => { handleFileImage(e); setStep(3) }}
                      />
                    </Button>


                    <Box sx={{ marginTop: 2 }}>
                      <Paper>
                      <Typography variant="h6" gutterBottom>
                        Imagens Enviadas
                      </Typography>
                      {uploadedImages.length > 0 ? (
                        <Grid container spacing={2} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
                          {uploadedImages.map((image, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index} >
                              <Paper
                                elevation={2}
                                sx={{
                                  padding: '10px',
                                  textAlign: 'center',
                                  backgroundColor: '#f9f9f9',
                                }}
                              >
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt={`Preview da imagem ${index}`}
                                  style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: '200px',
                                  }}
                                />
                                <Typography variant="body2" noWrap sx={{ marginTop: '10px' }}>
                                  {image.name}
                                </Typography>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>

                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          Nenhuma imagem enviada.
                        </Typography>
                      )}
                      </Paper>
                    </Box>

                  </Paper>
                </Grow>
              )}



              {step >= 3 && (
                <Grow in={step >= 3} timeout={500}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                    <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '20px', width: '30vw', justifyContent: 'center', alignItems: 'center' }}>
                      <Typography variant="h5" gutterBottom><strong>Escolha o nome do curso</strong></Typography>
                      <Typography variant="h4" fontSize={'75%'} marginBottom={2}>Esse será o nome do curso dentro da plataforma</Typography>
                      <TextField
                        sx={{ width: '80%' }}
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        placeholder="Digite o nome do curso..."
                      />



                      <Typography marginTop={5}>Caso tenha <strong>SELECIONADO</strong> todos os arquivos necessários para a criação do curso <strong>IMAGENS, PDF E DOCX</strong> <br></br><br></br> Clique em <strong>CONFIRMAR</strong> e aguarde a confirmação da postagem.</Typography>
                      <Button variant="contained" color="primary" onClick={handleConfirm} sx={{ marginTop: 3 }}>
                        Confirmar
                      </Button>
                      {confirmLoading && (
                        <Box
                          sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1500,
                            backdropFilter: 'blur(5px)',
                          }}
                        >
                          <CircularProgress size={60} />
                        </Box>
                      )}
                    </Paper>

                  </Box>




                </Grow>

              )}


            </Box>


          </Box>









        </Paper>
      </Box>
    </Box>
  );
}

export default App;


