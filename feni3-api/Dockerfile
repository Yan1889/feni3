FROM amazoncorretto:21 AS builder
WORKDIR /build-dir

COPY gradle/ gradle/
COPY gradlew .
COPY build.gradle .
COPY settings.gradle .
RUN ./gradlew dependencies --no-daemon

COPY . .
RUN ./gradlew build --no-daemon

FROM amazoncorretto:21
WORKDIR /app
COPY --from=builder /build-dir/build/libs/feni3-0.0.1-SNAPSHOT.jar app.jar
COPY --from=builder /build-dir/train.sh train.sh
RUN yum install -y curl jq gawk && yum clean all
EXPOSE 8082
CMD ["java", "-jar", "app.jar"]
