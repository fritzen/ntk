<div class="widgetAuthoring">
    <div class="widgetTop typeLogic">
        <div class="title dragHandle">
        { widget:title } <div class="remove">x</div>
        </div>
    </div>

    <div class="widgetLeft">
        <div class='inlets'>
            <div rv-each-inlet="widget:ins" rv-alt="inlet.title" rv-data-field="inlet.to" class='inlet'>&middot;</div>
        </div>
    </div>

    <div class="widgetBody">
        <div class="ifTop">
            <div class="widgetBodyLeft" class="ifInput">
                <div class="inletValue">
                    <span rv-text="widget:in | rounded">0</span>
                </div>
            </div>
            <div class="widgetBodyRight" class="ifOutput">
                <div class="outletValue">
                    <input class="ifFalse" class="outputParam" type="text" pattern="[0-9]*" rv-value="widget:ifFalse | rounded">
                    <input class="ifTrue" class="outputParam" type="text" pattern="[0-9]*" rv-value="widget:ifTrue | rounded">
                </div>
            </div>
            <div class="inletValue" class="ifStatement">
                IF <select class="operator" rv-value="widget:operator">
                  <option value=">">&gt;</option>
                  <option value="<">&lt;</option>
                  <option value="~=">&#126;=</option>
                </select>
                <input class="outputParam" type="text" pattern="[0-9]*" rv-value="widget:compareValue">
            </div>
        </div>
    </div>

    <div class="widgetRight">
        <div class='outlets'>
            <div class="outlet" rv-each-outlet="widget:outs" rv-alt="outlet.title" rv-data-field="outlet.to">&middot;</div>
        </div>
    </div>
            
    <div class="widgetBottom">
        <div class="tab"><p>more</p></div>
        <div class="content">
            <label>&#126;= range</label> <input class="moreParam" type="text" rv-value="widget:compareRange"><br>
            <label>wait true</label> <input class="moreParam" type="text" rv-value="widget:waitTimeTrue"><br>
            <label>wait false</label> <input class="moreParam" type="text" rv-value="widget:waitTimeFalse">
        </div>
    </div>
</div>