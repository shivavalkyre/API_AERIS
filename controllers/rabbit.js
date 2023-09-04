const amqp = require('amqplib');

var SendMessage = async function(req_type,reply){
    try {
        // Connect to RabbitMQ server
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
    
        // Create a queue
        const queueName = 'myQueue';
        await channel.assertQueue(queueName, { durable: false });
    
        // Send a message to the queue
        const message = req_type + '';
        
        channel.sendToQueue(queueName, Buffer.from(message));
        
        console.log('message: ' + message)
        
    
        // Close the connection
        setTimeout(() => {
           
          connection.close();
        //   process.exit(0);
        }, 500);
      } catch (error) {
        console.error('Error:', error);
        // process.exit(1);
      }
}



var ReceiveMessage = async function(reply){

    try {
        // Connect to RabbitMQ server
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
    
        // Create a queue
        const queueName = 'myQueue';
        await channel.assertQueue(queueName, { durable: false });
    
        console.log('Waiting for messages...');
    
        // Consume messages from the queue
        channel.consume(queueName, (message) => {
        // console.log(`Received message: ${message.content.toString()}`);

        //  reply(message.content.toString())

        }, { noAck: true });
      } catch (error) {
        console.error('Error:', error);
        // process.exit(1);
      }

}

module.exports = {
    SendMessage,
    ReceiveMessage
}