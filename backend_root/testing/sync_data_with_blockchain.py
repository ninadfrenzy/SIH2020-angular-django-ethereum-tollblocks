import pymysql
import web3_ganache
# import toll_blocks_web3_script
import schedule 
import time 

def get_data_from_db():

    # Open database connection
    db = pymysql.connect("localhost","dbadmin","disha_shinde","toll_blocks" )

    # prepare a cursor object using cursor() method
    cursor = db.cursor()

    # Prepare SQL query to SELECT records from the database.
    sql = """
            SELECT distinct road_id_id, sum(amount) 
                FROM toll_blocks.testing_transaction 
                group by road_id_id 
                having road_id_id IN 
                (
                    SELECT road_id_id FROM toll_blocks.testing_transaction where DATE(created_at)=CURDATE()
                );
         """
    try:
        # Execute the SQL command
        cursor.execute(sql)
        # Fetch all the rows in a list of lists.
        results = cursor.fetchall()
        if len(results) == 0:
            print("No new transactions today.")
            return False
        else:
            new_data = []
            for row in results:
                road_id = row[0]
                total_amount = row[1]
                #print("0", road_id, total_amount)
                
                # Add collected amount to the corresponding road's collected amount field
                sql = "UPDATE toll_blocks.testing_road SET collected_amount = collected_amount + %f where road_id = '%s';" %(total_amount, road_id)
                cursor.execute(sql)
                # Get the contract amount and collected amount of the road in order to find the remaining amount to be collected
                sql = "SELECT contract_amount, collected_amount FROM toll_blocks.testing_road where road_id = '%s';" %(road_id)
                cursor.execute(sql)
                result = cursor.fetchone()
                remaining_amount = result[0] - result[1]                    # contract_amount - collected_amount                

                new_data.append([road_id, remaining_amount])
               
            return new_data
       
    except:
       print ("Error: unable to fetch data")
    
    # disconnect from server
    db.close()


# update data on blockchain
def send_data_to_blockchain():
    new_data = get_data_from_db()
    if new_data == False:
        return False
        
    else:
        for row in new_data:
            # toll_blocks_web3_script.update_contract(str(row[0]), str(row[1]))
            web3_ganache.update_contract(str(row[0]), str(row[1]))  


# Task scheduling 
# After every 1 min send_data_to_blockchain() is called. 
schedule.every(1).minutes.do(send_data_to_blockchain) 

# After every hour send_data_to_blockchain() is called. 
# schedule.every().hour.do(send_data_to_blockchain) 

# Every day at 12am or 00:00 time send_data_to_blockchain() is called. 
# schedule.every().day.at("00:00").do(send_data_to_blockchain) 


# Loop so that the scheduling task keeps on running all time. 
while True: 
	# Checks whether a scheduled task is pending to run or not 
	schedule.run_pending() 
	time.sleep(1)
