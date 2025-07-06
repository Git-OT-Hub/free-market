FROM alpine:3.20

RUN apk add --no-cache curl bash

RUN curl -L https://github.com/stripe/stripe-cli/releases/download/v1.28.0/stripe_1.28.0_linux_x86_64.tar.gz -o stripe.tar.gz && \
    tar -xzf stripe.tar.gz && \
    mv stripe /usr/local/bin/stripe && \
    chmod +x /usr/local/bin/stripe && \
    rm stripe.tar.gz

CMD ["sleep", "infinity"]