## Ambiente Virtual ##
# Windows
python -m venv venv
# MacOS / Linux
python3 -m venv venv

## Ativar ambiente Virutal ##
# Windows
venv\Scripts\activate
# MacOS / Linux
source venv/bin/activate

## Instalar dependências ##
# Windows / MacOS / Linux
pip install -r requirements.txt

## A partir daqui, abrir 2 terminais ____
# Verificar se venv esta ativada em cada uma delas #

## Backend
cd backend
flask run

## Frontend
npm install
npm run build
npm start

## Para encerrar a execução ##
# Control+C em ambos os terminais
deactivate