FROM amazoncorretto:21 AS builder
WORKDIR /build-dir
RUN dnf install -y findutils
COPY gradle/ gradle/
COPY gradlew .
COPY build.gradle .
COPY settings.gradle .å
RUN ./gradlew dependencies --no-daemon
COPY . .
RUN ./gradlew build --no-daemon

FROM amazoncorretto:21
WORKDIR /app
RUN dnf install -y jq gawk && dnf clean all
COPY --from=builder /build-dir/build/libs/feni3-0.0.1-SNAPSHOT.jar app.jar
COPY --from=builder /build-dir/train.sh train.sh
COPY --from=builder /build-dir/bus.sh bus.sh
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
