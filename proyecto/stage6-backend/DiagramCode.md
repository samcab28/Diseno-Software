# Diagram Code

En este archivo se tendra el codigo uml de los diagramas, en caso de consultarlo o graficarlo de manera inmediate en plataformas como [Mermaid Live](https://mermaid.live/edit)

## IA PROVIDER
``` uml
```uml
classDiagram
    %% Abstracción refinada
    class AIService {
        -aiProvider: AIProvider
        +analyze(): AIAnalysisResult
        +predict(): PredictionResult
        +train(): TrainingResult
        +evaluate(): EvaluationResult
        +validate(): ValidationResult
    }
    
    class ImageAnalysisService {
        -aiProvider: AIProvider
        -imageConfig: ImageConfig
        +analyze(): AIAnalysisResult
        +detectObjects(): DetectionResult
        +classifyImage(): ClassificationResult
        +generateDescription(): DescriptionResult
    }
    
    class TextAnalysisService {
        -aiProvider: AIProvider
        -languageConfig: LanguageConfig
        +analyze(): AIAnalysisResult
        +sentiment(): SentimentResult
        +extractEntities(): EntityResult
        +summarize(): SummaryResult
    }
    
    %% Interfaz del Bridge (Implementador)
    class AIProvider {
        <<interface>>
        +createAnalysis(request: AIRequest): Analysis
        +processAnalysis(analysis: Analysis): AnalysisResult
        +trainModel(config: TrainingConfig): TrainingResult
        +validateResults(results: Results): ValidationResult
        +getPrediction(input: Input): PredictionResult
    }
    
    %% Implementaciones Concretas
    class AzureAIProvider {
        -client: AzureClient
        -config: AzureConfig
        +createAnalysis(request: AIRequest): Analysis
        +processAnalysis(analysis: Analysis): AnalysisResult
        +trainModel(config: TrainingConfig): TrainingResult
        +validateResults(results: Results): ValidationResult
        +getPrediction(input: Input): PredictionResult
    }
    
    class GoogleAIProvider {
        -client: GoogleAIClient
        -config: GoogleConfig
        +createAnalysis(request: AIRequest): Analysis
        +processAnalysis(analysis: Analysis): AnalysisResult
        +trainModel(config: TrainingConfig): TrainingResult
        +validateResults(results: Results): ValidationResult
        +getPrediction(input: Input): PredictionResult
    }
    
    class OpenAIProvider {
        -client: OpenAIClient
        -config: OpenAIConfig
        +createAnalysis(request: AIRequest): Analysis
        +processAnalysis(analysis: Analysis): AnalysisResult
        +trainModel(config: TrainingConfig): TrainingResult
        +validateResults(results: Results): ValidationResult
        +getPrediction(input: Input): PredictionResult
    }
    
    AIService --> AIProvider
    ImageAnalysisService --|> AIService
    TextAnalysisService --|> AIService
    AIProvider <|.. AzureAIProvider
    AIProvider <|.. GoogleAIProvider
    AIProvider <|.. OpenAIProvider

```

## Payment Provider
``` uml
classDiagram
    %% Abstracción refinada
    class Payment {
        -paymentProvider: PaymentProvider
        +process(): PaymentResult
        +authorize(): AuthorizationResult
        +capture(): CaptureResult
        +void(): VoidResult
        +refund(): RefundResult
    }
    
    class SubscriptionPayment {
        -paymentProvider: PaymentProvider
        -subscriptionDetails: SubscriptionDetails
        +process(): PaymentResult
        +authorize(): AuthorizationResult
        +setupRecurring(): RecurringResult
        +cancelSubscription(): CancelResult
    }
    
    class InstallmentPayment {
        -paymentProvider: PaymentProvider
        -installmentPlan: InstallmentPlan
        +process(): PaymentResult
        +authorize(): AuthorizationResult
        +setupInstallments(): InstallmentResult
        +modifyPlan(): ModifyResult
    }

    %% Interfaz del Bridge (Implementador)
    class PaymentProvider {
        <<interface>>
        +createTransaction(request: PaymentRequest): Transaction
        +processTransaction(transaction: Transaction): TransactionResult
        +authorizeTransaction(transaction: Transaction): AuthorizationResult
        +voidTransaction(transaction: Transaction): VoidResult
        +refundTransaction(transaction: Transaction): RefundResult
    }

    %% Implementaciones Concretas
    class StripeProvider {
        -client: StripeClient
        -config: StripeConfig
        +createTransaction(request: PaymentRequest): Transaction
        +processTransaction(transaction: Transaction): TransactionResult
        +authorizeTransaction(transaction: Transaction): AuthorizationResult
        +voidTransaction(transaction: Transaction): VoidResult
        +refundTransaction(transaction: Transaction): RefundResult
    }

    class PayPalProvider {
        -client: PayPalClient
        -config: PayPalConfig
        +createTransaction(request: PaymentRequest): Transaction
        +processTransaction(transaction: Transaction): TransactionResult
        +authorizeTransaction(transaction: Transaction): AuthorizationResult
        +voidTransaction(transaction: Transaction): VoidResult
        +refundTransaction(transaction: Transaction): RefundResult
    }

    class MercadoPagoProvider {
        -client: MercadoPagoClient
        -config: MercadoPagoConfig
        +createTransaction(request: PaymentRequest): Transaction
        +processTransaction(transaction: Transaction): TransactionResult
        +authorizeTransaction(transaction: Transaction): AuthorizationResult
        +voidTransaction(transaction: Transaction): VoidResult
        +refundTransaction(transaction: Transaction): RefundResult
    }

    Payment --> PaymentProvider
    SubscriptionPayment --|> Payment
    InstallmentPayment --|> Payment
    PaymentProvider <|.. StripeProvider
    PaymentProvider <|.. PayPalProvider
    PaymentProvider <|.. MercadoPagoProvider
```

## Database Manager
```uml
classDiagram
    class IDataRepository {
        <<interface>>
        +connect()
        +disconnect()
        +query(query: string): Result
        +execute(command: string): Result
        +backup(): BackupResult
    }

    class PostgreSQLRepository {
        -connection: PostgreSQLConnection
        +connect()
        +disconnect()
        +query(query: string): Result
        +execute(command: string): Result
        +backup(): BackupResult
    }

    class MongoDBRepository {
        -connection: MongoDBConnection
        +connect()
        +disconnect()
        +query(query: string): Result
        +execute(command: string): Result
        +backup(): BackupResult
    }

    class S3Repository {
        -connection: S3Connection
        +connect()
        +disconnect()
        +uploadFile(file: File): UploadResult
        +downloadFile(fileId: string): DownloadResult
        +deleteFile(fileId: string): DeleteResult
        +backup(): BackupResult
    }

    class DataManager {
        -repository: IDataRepository
        -securityManager: SecurityManager
        +setRepository(repository: IDataRepository)
        +performOperation(operation: string, data: any): Result
        +performBackup(): BackupResult
    }

    class SecurityManager {
        +encryptConnection(connection: any): EncryptedConnection
        +decryptConnection(connection: EncryptedConnection): any
        +validateAccess(user: User, operation: string): boolean
    }

    class BackupStrategy {
        <<interface>>
        +performBackup(repository: IDataRepository): BackupResult
    }

    class FullBackupStrategy {
        +performBackup(repository: IDataRepository): BackupResult
    }

    class IncrementalBackupStrategy {
        +performBackup(repository: IDataRepository): BackupResult
    }

    IDataRepository <|.. PostgreSQLRepository
    IDataRepository <|.. MongoDBRepository
    IDataRepository <|.. S3Repository
    DataManager --> IDataRepository
    DataManager --> SecurityManager
    DataManager --> BackupStrategy
    BackupStrategy <|.. FullBackupStrategy
    BackupStrategy <|.. IncrementalBackupStrategy
```

## Api Gateway
```uml
classDiagram
    class APIGateway {
        -routingStrategy: RoutingStrategy
        -authenticationService: AuthenticationService
        -loggingService: LoggingService
        -rateLimiter: RateLimiter
        +handleRequest(request: Request): Response
        +setRoutingStrategy(strategy: RoutingStrategy)
        +authenticate(request: Request): boolean
        +logRequest(request: Request)
        +checkRateLimit(clientId: string): boolean
    }

    class RoutingStrategy {
        <<interface>>
        +routeRequest(request: Request): Response
    }

    class MicroserviceRoutingStrategy {
        -serviceRegistry: Map<string, string>
        +routeRequest(request: Request): Response
        -loadBalanceRequest(service: string): string
        -updateServiceRegistry()
    }

    class AuthenticationService {
        -cognitoUserPool: CognitoUserPool
        +validateToken(token: string): boolean
        +getUserInfo(token: string): UserInfo
        +refreshToken(refreshToken: string): string
    }

    class LoggingService {
        -cloudWatchClient: CloudWatchClient
        +logRequest(request: Request)
        +logResponse(response: Response)
        +logError(error: Error)
        -formatLogEntry(entry: any): string
    }

    class RateLimiter {
        -limits: Map<string, Limit>
        -redisClient: RedisClient
        +checkLimit(clientId: string): boolean
        +updateLimit(clientId: string)
        -getLimitKey(clientId: string): string
    }

    class Request {
        +headers: Map<string, string>
        +body: string
        +method: string
        +path: string
        +queryParams: Map<string, string>
        +getHeader(key: string): string
        +setHeader(key: string, value: string)
        +getQueryParam(key: string): string
    }

    class Response {
        +statusCode: int
        +headers: Map<string, string>
        +body: string
        +setHeader(key: string, value: string)
        +setBody(body: string)
        +setStatusCode(code: int)
    }

    APIGateway --> RoutingStrategy
    APIGateway --> AuthenticationService
    APIGateway --> LoggingService
    APIGateway --> RateLimiter
    RoutingStrategy <|.. MicroserviceRoutingStrategy
```

## Cognito 

```uml
classDiagram
    class CognitoAuthService {
        -userPool: CognitoUserPool
        -clientId: string
        -clientSecret: string
        +signUp(username: string, password: string, attributes: UserAttributes): SignUpResult
        +confirmSignUp(username: string, confirmationCode: string): ConfirmSignUpResult
        +signIn(username: string, password: string): SignInResult
        +refreshToken(refreshToken: string): RefreshTokenResult
        +forgotPassword(username: string): ForgotPasswordResult
        +confirmForgotPassword(username: string, confirmationCode: string, newPassword: string): ConfirmForgotPasswordResult
        +getUserAttributes(accessToken: string): GetUserAttributesResult
        +updateUserAttributes(accessToken: string, attributes: UserAttributes): UpdateUserAttributesResult
    }

    class CognitoUserPool {
        -poolId: string
        -region: string
        +createUser(username: string, password: string, attributes: UserAttributes): User
        +getUser(username: string): User
        +listUsers(): User[]
    }

    class User {
        -username: string
        -email: string
        -phoneNumber: string
        -attributes: Map<string, string>
        +getUsername(): string
        +getEmail(): string
        +getPhoneNumber(): string
        +getAttribute(key: string): string
        +setAttribute(key: string, value: string)
    }

    class UserAttributes {
        -email: string
        -phoneNumber: string
        -name: string
        -birthdate: string
        -address: string
        +toMap(): Map<string, string>
        +fromMap(map: Map<string, string>): UserAttributes
    }

    class SignUpResult {
        -userConfirmed: boolean
        -codeDeliveryDetails: CodeDeliveryDetails
        +isUserConfirmed(): boolean
        +getCodeDeliveryDetails(): CodeDeliveryDetails
    }

    class SignInResult {
        -accessToken: string
        -idToken: string
        -refreshToken: string
        -expiresIn: int
        +getAccessToken(): string
        +getIdToken(): string
        +getRefreshToken(): string
        +getExpiresIn(): int
    }

    class CodeDeliveryDetails {
        -destination: string
        -deliveryMedium: string
        -attributeName: string
        +getDestination(): string
        +getDeliveryMedium(): string
        +getAttributeName(): string
    }

    CognitoAuthService --> CognitoUserPool
    CognitoUserPool --> User
    CognitoAuthService ..> UserAttributes
    CognitoAuthService ..> SignUpResult
    CognitoAuthService ..> SignInResult
    SignUpResult ..> CodeDeliveryDetails
```

## Service Provider
```
classDiagram
    class ExternalServicesFacade {
        -serviceFactory: ExternalServiceFactory
        -services: Map<string, ExternalService>
        +getService(serviceName: string): ExternalService
        +callService(serviceName: string, method: string, params: Map<string, any>): ServiceResponse
        +registerService(serviceName: string, serviceConfig: ServiceConfig)
    }

    class ExternalServiceFactory {
        +createService(serviceConfig: ServiceConfig): ExternalService
    }

    class ExternalService {
        <<interface>>
        +call(method: string, params: Map<string, any>): ServiceResponse
        +getStatus(): ServiceStatus
    }

    class TalkJSService {
        -apiKey: string
        -baseUrl: string
        +call(method: string, params: Map<string, any>): ServiceResponse
        +getStatus(): ServiceStatus
        -initializeChat(userId: string): ChatSession
        -sendMessage(chatId: string, message: string): MessageResponse
    }

    class ReviewIOService {
        -apiKey: string
        -baseUrl: string
        +call(method: string, params: Map<string, any>): ServiceResponse
        +getStatus(): ServiceStatus
        -submitReview(productId: string, rating: int, comment: string): ReviewResponse
        -getProductReviews(productId: string): ReviewList
    }

    class AmazonLocationService {
        -awsCredentials: AWSCredentials
        -region: string
        +call(method: string, params: Map<string, any>): ServiceResponse
        +getStatus(): ServiceStatus
        -searchPlaces(query: string): PlaceList
        -calculateRoute(start: Point, end: Point): Route
        -trackDevicePosition(deviceId: string, position: Point): TrackingResponse
    }

    class NoonlightService {
        -apiKey: string
        -baseUrl: string
        +call(method: string, params: Map<string, any>): ServiceResponse
        +getStatus(): ServiceStatus
        -createAlarm(location: Point, userInfo: UserInfo): AlarmResponse
        -updateAlarm(alarmId: string, status: string): UpdateResponse
        -dispatchEmergencyServices(alarmId: string): DispatchResponse
    }

    class ServiceConfig {
        +serviceName: string
        +apiKey: string
        +baseUrl: string
        +additionalParams: Map<string, string>
    }

    class ServiceResponse {
        +success: boolean
        +data: any
        +error: string
    }

    class ServiceStatus {
        +isAvailable: boolean
        +lastChecked: DateTime
        +responseTime: int
    }

    ExternalServicesFacade --> ExternalServiceFactory
    ExternalServicesFacade --> ExternalService
    ExternalServiceFactory ..> ExternalService
    ExternalService <|.. TalkJSService
    ExternalService <|.. ReviewIOService
    ExternalService <|.. AmazonLocationService
    ExternalService <|.. NoonlightService
    ExternalServiceFactory ..> ServiceConfig
    ExternalService ..> ServiceResponse
    ExternalService ..> ServiceStatus
```

## Notification Service

```uml
classDiagram
    class NotificationService {
        -snsClient: SNSClient
        -sqsClient: SQSClient
        -topicArn: string
        -queueUrl: string
        +sendNotification(notification: Notification): NotificationResult
        +subscribeToTopic(endpoint: string, protocol: string): SubscriptionResult
        +unsubscribeFromTopic(subscriptionArn: string): UnsubscriptionResult
        +receiveNotifications(): Notification[]
        -createTopic(topicName: string): string
        -createQueue(queueName: string): string
    }

    class Notification {
        +id: string
        +type: NotificationType
        +content: string
        +recipient: string
        +metadata: Map<string, string>
        +timestamp: DateTime
        +setMetadata(key: string, value: string)
        +getMetadata(key: string): string
    }

    class NotificationType {
        <<enumeration>>
        EMAIL
        SMS
        PUSH
        IN_APP
    }

    class SNSClient {
        -credentials: AWSCredentials
        -region: string
        +publish(topicArn: string, message: string): PublishResult
        +createTopic(name: string): CreateTopicResult
        +subscribe(topicArn: string, protocol: string, endpoint: string): SubscribeResult
        +unsubscribe(subscriptionArn: string): UnsubscribeResult
    }

    class SQSClient {
        -credentials: AWSCredentials
        -region: string
        +sendMessage(queueUrl: string, messageBody: string): SendMessageResult
        +receiveMessage(queueUrl: string): ReceiveMessageResult
        +deleteMessage(queueUrl: string, receiptHandle: string): DeleteMessageResult
        +createQueue(queueName: string): CreateQueueResult
    }

    class NotificationResult {
        +success: boolean
        +messageId: string
        +errorMessage: string
    }

    class SubscriptionResult {
        +success: boolean
        +subscriptionArn: string
        +errorMessage: string
    }

    class UnsubscriptionResult {
        +success: boolean
        +errorMessage: string
    }

    NotificationService --> SNSClient
    NotificationService --> SQSClient
    NotificationService ..> Notification
    Notification --> NotificationType
    NotificationService ..> NotificationResult
    NotificationService ..> SubscriptionResult
    NotificationService ..> UnsubscriptionResult
```

