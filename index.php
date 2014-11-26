<!--This is the starting index file, it reads the content of the given url and saves as data.json-->

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN” “http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <title> MoaTest</title>

    </head>

    <body>

    <?php

    $test_url = 'http://testing.moacreative.com/job_interview/php/index.html';
    $html= file_get_contents($test_url);
    //use DOMDocument to load url content
    $dom = new DOMDocument();
    $dom->loadHTML($html);

    // calling convert_to_json function to perform conversion
    $json_data = convert_to_json($dom->documentElement);
    $file = fopen("data.json", "w") or die("Unable to open file!");

    fwrite($file, json_encode($json_data, JSON_PRETTY_PRINT));
    fclose($file);

    //this recursive function takes a DOMElement as input
    //and converts it in to jason object
    function convert_to_json($document_element){

        $node_data = array();
        $attributes = array();
        // process atrributes
        if($document_element->hasAttributes()){
            foreach ($document_element->attributes as $attribute) {
                $attributes[$attribute->name] = $attribute->value;
            }
        }


        if(!empty($attributes)){
            $node_data['attributes'] = $attributes;
        }


        $children = array();
        // process all its children
        if($document_element->hasChildNodes()){
            foreach ($document_element->childNodes as $child) {
                if($child->nodeType == XML_TEXT_NODE){
                    $node_data['value'] =  $child->wholeText;
                }
                else if($child->nodeType == XML_CDATA_SECTION_NODE){
                    $node_data['value'] = $child->data;
                }
                else $children[] = convert_to_json($child);
            }
        }

        if(!empty($children)){
            $node_data['children'] = $children;
        }

        $json_obj = array( $document_element->tagName => $node_data );
        return $json_obj;
    }
    ?>

        <p>
        <h4>
            The content of the given url has been saved as data.json.
            Click <span><a href = "/MoaTest/showTree.php">here</a></span> to view tree.
        </h4>
        </p>
    </body>

</html>

