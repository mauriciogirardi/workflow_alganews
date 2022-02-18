FROM alpine:latest
RUN echo 'Criando pastas de armazenamento'
RUN mkdir -p /storage/posts
RUN mkdir -p /storage/photos
RUN echo 'Copiando imagens'
COPY posts/ /storage/posts
COPY photos/ /storage/photos
RUN chmod a+rw -R /storage
RUN ls /storage/photos
RUN ls /storage/posts
RUN echo 'Imagens copiadas'