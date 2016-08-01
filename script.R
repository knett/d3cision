rm(list = ls())
library(rpart)
library(partykit)
library(jsonlite)
library(magrittr)
library(purrr)
library(broom)

# http://stackoverflow.com/questions/34196611/converting-rpart-output-into-json-format-in-r

# json_prsr <- function(tree, node = 1, node_stats = NULL){
#   
#   # Checking the decision tree object
#   if(!is(tree, c("constparty","party")))
#     tree <- partykit::as.party(tree)
#   
#   # Parsing into json format
#   str  <- ""
#   rule <- partykit:::.list.rules.party(tree, node)
#   
#   if(is.null(node_stats))
#     node_stats <- table(tree$fitted[1])
#   
#   children <- partykit::nodeids(tree, node)
#   
#   if (length(children) == 1) {
#     ct  <- node_stats[as.character(children)]
#     str <- paste("{ ","name : '",children,"',size :",ct,",rule :'",rule,"' }", sep='')
#   } else {
#     str <- paste("{ ","name : '", node,"', rule : '", rule, "', children : [", sep='')
#     for(child in children){
#       check <- paste("{ name : '", child, "'", sep='')
#       if(child != node & ( !grepl(check, str, fixed=TRUE) ) ) {
#         child_str <- json_prsr(tree, child, node_stats)
#         str <- paste(str, child_str, ',', sep='')
#       }
#     }
#     str <- substr(str, 1, nchar(str)-1) #Remove the comma
#     str <- paste(str,"]}", sep='')
#   }
#   return(str)
# }
# 
# json <- json_prsr(rpk)
# json <- paste("[", json, "]")


tree_list <- function(tree, node = 1){
  
  # Checking the decision tree object
  if(!is(tree, c("constparty","party")))
    tree <- partykit::as.party(tree)
  
  rule <- partykit:::.list.rules.party(tree, node)

  children <- partykit::nodeids(tree, node)
  
  size <- sum(table(tree$fitted[1])[as.character(children)], na.rm = TRUE)
  
  responsessum <- tidy(summary(tree[[node]]$fitted[["(response)"]]))

  if (length(children) == 1) {

    str <- list(name = children, size = size, rule = rule,
                responsessum = responsessum, terminal = FALSE)
    
  } else {

    str <- list(name = node, size = size, rule = rule,
                responsessum = responsessum, terminal = TRUE,
                children = NULL)
    
    children2 <- setdiff(children, node)
    
    str$children <- map(children2, tree_list, tree = tree)

  }
  return(str)
}


# EXAMPLE 1 ---------------------------------------------------------------
tree <- rpart(hp ~ ., data = mtcars, control = rpart.control(minsplit = 4))
tree <- as.party(tree)

plot(tree)

tree %>% 
  tree_list() %>% 
  toJSON(auto_unbox = TRUE, pretty = TRUE) %>% 
  writeLines(con = "data1.json")


# EXAMPLE 2 ---------------------------------------------------------------
tree <- ctree(Species ~ .,data = iris)
plot(tree)

tree %>% 
  tree_list() %>% 
  toJSON(auto_unbox = TRUE, pretty = TRUE) %>% 
  writeLines(con = "data2.json")

nodeapply(tree, id = seq(width(tree)), function(n) info_node(n))


# EXAMPLE 3 ---------------------------------------------------------------
tree <- ctree(Ozone ~ ., data = subset(airquality, !is.na(Ozone)))
plot(tree)

tree %>% 
  tree_list() %>% 
  toJSON(auto_unbox = TRUE, pretty = TRUE) %>% 
  writeLines(con = "data3.json")
