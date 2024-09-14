# FLIP-Chart - Flipkart Grid 6.0 SemiFinals Submission
FlipChart addresses a critical challenge in the fashion retail industry—accurate sizing. Many apparel sellers, particularly smaller brands, struggle to provide precise size charts, making it difficult for customers to find the right fit. This often leads to dissatisfaction, low conversion rates, and increased return costs.

FlipChart leverages advanced AI techniques to generate accurate, dynamic size charts tailored to individual customers. Using a Retrieval-Augmented Generation (RAG) framework, it employs CoIBERT embeddings to retrieve and rank product data based on user reviews, body measurements, and purchase history. By integrating models like TILDEv2 and MonoT5, FlipChart ensures relevance and precision in its recommendations.

The system’s vector database encodes various data points, including body type, purchase history, and product returns, improving the retrieval of relevant size information. Its few-shot learning capabilities allow for easy adaptation to new brands and product lines with minimal training, while continuous feedback loops ensure up-to-date accuracy. FlipChart offers a scalable, efficient solution that enhances the shopping experience and reduces sizing issues, particularly for emerging brands.


## Demo Video 
https://drive.google.com/file/d/19_fx_WtL1DyxJq1IWtp1eic8gFz5YBOV/view?usp=sharing

## Model Architecture And Algorithm

The algorithm follows a multi-step process to generate accurate size charts. First, a pool of documents containing product data, user reviews, and other relevant information is created. The CoIBERT model, a pre-trained retriever, is then employed to process the pool of documents alongside a query, ranking the documents based on similarity scores. From these, the top-k documents are parsed into paragraphs for further analysis.

Next, advanced reranking algorithms, such as TILDEv2 and MonoT5, are applied to these top-k paragraphs to refine the rankings and ensure query-specific relevance. The refined paragraphs are then passed to a reader model, such as Claude or GPT-3.5, where each paragraph, along with the query, is evaluated. Finally, the system aggregates the results, selecting the best size chart for a product based on the confidence scores provided by the reader model.
![GRID-Page-5 drawio-min](https://github.com/user-attachments/assets/64c410ce-982b-4935-ae7f-ae0f44ec34b6)


## Dataset Description And Screenshots
Balanced partitions for men and women  
Semantic review inference for review filtering
20+ unique article attributes.
Attribute body_shape ID - gives article’s best fit body type.
Categories: 
Jackets, Jeans, t shirts, Shirts, Dresses, trousers, sweatshirts, tops
Size charts with Label shifts. 

SEND SS PLIS!!!!

## TECH STACK
React
Express
Node js
MongoDB
FAST Api
ADDD MOre Here plis
